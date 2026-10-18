import { jsPDF } from 'jspdf';
import { RESUME_DATA, PROJECTS, EXPERIENCES } from '../constants';

export function generateAndDownloadResume() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = 14;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 12) {
      doc.addPage();
      y = 14;
    }
  };

  // -------------------------------------------------------------
  // Header Section
  // -------------------------------------------------------------
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text(RESUME_DATA.name, margin, y);

  // Right-aligned contact info in header
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105); // slate-600
  doc.text(`Contact: ${RESUME_DATA.phone}`, pageWidth - margin, y - 3, { align: 'right' });
  doc.text(RESUME_DATA.location, pageWidth - margin, y + 1, { align: 'right' });
  doc.text(`Email: ${RESUME_DATA.email}`, pageWidth - margin, y + 5, { align: 'right' });

  // Subtitle
  y += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(79, 70, 229); // indigo-600
  doc.text(RESUME_DATA.title, margin, y);

  // Header Links with clickable URLs
  const linkGithubText = 'GitHub';
  const linkPortfolioText = 'Portfolio';
  const linkLinkedInText = 'LinkedIn';

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(79, 70, 229);

  const rightX = pageWidth - margin;
  doc.textWithLink(linkLinkedInText, rightX - 12, y, { url: RESUME_DATA.linkedin });
  doc.textWithLink(linkPortfolioText, rightX - 26, y, { url: RESUME_DATA.portfolio });
  doc.textWithLink(linkGithubText, rightX - 38, y, { url: RESUME_DATA.github });

  // Underline separator
  y += 4;
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.setLineWidth(0.6);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;

  // Helper Section Title
  const addSectionTitle = (title: string) => {
    checkPageBreak(12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text(title, margin, y);

    doc.setDrawColor(79, 70, 229);
    doc.setLineWidth(0.4);
    doc.line(margin, y + 1.2, margin + 25, y + 1.2);
    y += 5;
  };

  // -------------------------------------------------------------
  // 1. Summary
  // -------------------------------------------------------------
  addSectionTitle('Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85); // slate-700
  const summaryLines = doc.splitTextToSize(RESUME_DATA.summary, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 3.6 + 3;

  // -------------------------------------------------------------
  // 2. Experience
  // -------------------------------------------------------------
  addSectionTitle('Experience');
  EXPERIENCES.forEach((exp) => {
    checkPageBreak(16);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(exp.role, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(exp.period, pageWidth - margin, y, { align: 'right' });
    y += 3.8;

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(79, 70, 229);
    doc.text(exp.company, margin, y);
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    exp.description.forEach((desc) => {
      const bullet = `• ${desc}`;
      const splitBullet = doc.splitTextToSize(bullet, contentWidth - 4);
      checkPageBreak(splitBullet.length * 3.4 + 1);
      doc.text(splitBullet, margin + 2, y);
      y += splitBullet.length * 3.4;
    });
    y += 1.5;
  });
  y += 1.5;

  // -------------------------------------------------------------
  // 3. Certifications
  // -------------------------------------------------------------
  addSectionTitle('Certifications');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(RESUME_DATA.certification.title, margin, y);
  y += 3.6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(RESUME_DATA.certification.authority, margin, y);
  y += 3.6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(79, 70, 229);
  doc.textWithLink(`Certificate Link: ${RESUME_DATA.certification.link}`, margin, y, {
    url: RESUME_DATA.certification.link
  });
  y += 4.5;

  // -------------------------------------------------------------
  // 4. Courses
  // -------------------------------------------------------------
  addSectionTitle('Courses');
  RESUME_DATA.courses.forEach((c) => {
    checkPageBreak(8);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(c.name, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`${c.institute} (${c.status})`, pageWidth - margin, y, { align: 'right' });
    y += 4;
  });
  y += 1.5;

  // -------------------------------------------------------------
  // 5. Technical Skills
  // -------------------------------------------------------------
  addSectionTitle('Technical Skills');
  const skillCategories = [
    { label: 'Frontend:', items: 'Bootstrap, Tailwind CSS, React.Js, Next.Js, TanStack Query, JavaScript.' },
    { label: 'Version Control:', items: 'Git, GitHub' },
    { label: 'Developer Tools:', items: 'VS Code, Vercel, Netlify' }
  ];

  skillCategories.forEach((sc) => {
    checkPageBreak(6);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(sc.label, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    doc.text(sc.items, margin + 30, y);
    y += 3.8;
  });
  y += 1.5;

  // -------------------------------------------------------------
  // 6. Projects
  // -------------------------------------------------------------
  addSectionTitle('Projects');
  PROJECTS.forEach((proj) => {
    checkPageBreak(18);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(proj.title, margin, y);
    y += 3.6;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(79, 70, 229);
    doc.textWithLink(`Live: ${proj.link}`, margin, y, { url: proj.link });
    y += 3.4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(51, 65, 85);
    const splitDesc = doc.splitTextToSize(proj.description, contentWidth);
    doc.text(splitDesc, margin, y);
    y += splitDesc.length * 3.4 + 2;
  });

  // -------------------------------------------------------------
  // 7. Education
  // -------------------------------------------------------------
  addSectionTitle('Education');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(RESUME_DATA.education.degree, margin, y);
  y += 3.6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(RESUME_DATA.education.institution, margin, y);
  y += 3.6;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(RESUME_DATA.education.status, margin, y);
  y += 4.5;

  // -------------------------------------------------------------
  // 8. Soft Skills
  // -------------------------------------------------------------
  addSectionTitle('Soft Skills');
  RESUME_DATA.softSkills.forEach((skill) => {
    const bullet = `• ${skill}`;
    const splitSkill = doc.splitTextToSize(bullet, contentWidth - 4);
    checkPageBreak(splitSkill.length * 3.4 + 1);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(51, 65, 85);
    doc.text(splitSkill, margin + 2, y);
    y += splitSkill.length * 3.4;
  });

  // Save / Download PDF
  doc.save('MD_SHAMIM_Resume.pdf');
}
