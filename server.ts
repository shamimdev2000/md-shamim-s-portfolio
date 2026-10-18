import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYSTEM_INSTRUCTION = `
You are the personal AI assistant for MD SHAMIM, a dedicated Frontend Web Developer.

About MD SHAMIM:
- Name: MD SHAMIM
- Role: Frontend Web Developer
- Skills: React.js, JavaScript, HTML, CSS, Tailwind CSS, Firebase, VS Code, System Design
- Projects: Petroil Project (Real-time monitoring dashboard), Nexcent Project (Headless commerce platform), Chatting Application
- Experience: Front End Developer at InnoSystems, Upcoming MERN Stack Developer at CIT
- Tone: Professional, friendly, concise, and enthusiastic

Always respond helpfully to questions about Shamim's portfolio, projects, background, and skills.
`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // AI Chat endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { history = [], message } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({
          reply: "Hi! I am Shamim's AI assistant. MD SHAMIM is a skilled Frontend Web Developer specializing in React, JavaScript, and Tailwind CSS. Feel free to explore his projects and get in touch! (Note: Configure GEMINI_API_KEY for dynamic AI responses)."
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const contents = [
        ...history.map((msg: { role: string; content: string }) => ({
          role: msg.role === 'model' || msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        })),
        {
          role: 'user',
          parts: [{ text: message }]
        }
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      const reply = response.text || "I'm here to help you learn more about Shamim's work and projects!";
      res.json({ reply });
    } catch (error: any) {
      console.error('Gemini API Error in /api/chat:', error);
      res.json({
        reply: "I'm temporarily unavailable. Feel free to explore Shamim's projects or reach him directly via the contact form!"
      });
    }
  });

  // Vite middleware in development vs static serving in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
