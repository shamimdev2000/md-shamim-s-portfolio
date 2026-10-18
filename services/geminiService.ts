import { ChatMessage } from '../types';

export class GeminiAssistant {
  static async chat(history: ChatMessage[], userInput: string): Promise<string> {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          history,
          message: userInput,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      return data.reply || "I'm temporarily unavailable. Please use the contact form to reach MD SHAMIM.";
    } catch (error) {
      console.error('Chat error:', error);
      return "I'm temporarily unavailable. Please feel free to explore the portfolio or use the contact form to reach MD SHAMIM.";
    }
  }
}
