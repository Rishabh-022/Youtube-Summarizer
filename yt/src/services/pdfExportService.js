import { jsPDF } from "jspdf";

export function exportNotesToPDF(studyPackage) {
  if (!studyPackage) return;
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const margin = 20;
  let cursorY = 25;

  // Header Banner
  doc.setFillColor(10, 16, 36);
  doc.rect(0, 0, 210, 38, "F");
  doc.setFillColor(0, 240, 255);
  doc.rect(0, 37, 210, 1.5, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("YOUTUBE STUDY GUIDE & NOTES", margin, 18);
  doc.setFontSize(10);
  doc.setTextColor(180, 200, 230);
  doc.text(`Video: ${studyPackage.videoTitle}`, margin, 26);
  doc.text(`Date: ${studyPackage.generatedAt}`, margin, 32);

  cursorY = 50;

  // 1. Summary
  doc.setTextColor(0, 120, 180);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("1. EXECUTIVE SUMMARY", margin, cursorY);
  cursorY += 6;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(40, 45, 55);
  const summaryLines = doc.splitTextToSize(studyPackage.summary.tl_dr, 170);
  doc.text(summaryLines, margin, cursorY);
  cursorY += summaryLines.length * 5 + 8;

  // 2. Comprehensive Notes
  doc.setTextColor(16, 140, 90);
  doc.setFont("helvetica", "bold");
  doc.text("2. COMPREHENSIVE STUDY NOTES", margin, cursorY);
  cursorY += 6;
  doc.setFont("helvetica", "normal");
  studyPackage.notes.sections.forEach((sec) => {
    if (cursorY > 260) { doc.addPage(); cursorY = 20; }
    doc.setFont("helvetica", "bold");
    doc.text(sec.heading, margin, cursorY);
    cursorY += 5;
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(sec.content, 170);
    doc.text(lines, margin, cursorY);
    cursorY += lines.length * 5 + 6;
  });

  doc.save(`${studyPackage.videoTitle.slice(0, 20).replace(/\s+/g, '_')}_study_guide.pdf`);
}