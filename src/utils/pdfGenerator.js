import { jsPDF } from 'jspdf';

/**
 * Generates and downloads a PDF for a specific study note.
 * @param {Object} note - The summary note object (from notesData)
 * @param {Object} content - The detailed content object (from notesContent)
 */
export const generateNotePDF = (note, content) => {
  if (!content) return;

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let cursorY = 30;

  // Header Background
  doc.setFillColor(30, 58, 138); // Navy Blue
  doc.rect(0, 0, pageWidth, 40, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text(note.title, margin, 25);

  // Subtitle (Category)
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Academic Notes — ${note.category}`, margin, 34);

  cursorY = 55;

  // Sections
  content.sections.forEach((section, index) => {
    // Check for page break
    if (cursorY > pageHeight - 40) {
      doc.addPage();
      cursorY = 20;
    }

    // Section Heading
    doc.setTextColor(30, 58, 138);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(`${index + 1}. ${section.heading}`, margin, cursorY);
    cursorY += 10;

    // Section Points
    doc.setTextColor(51, 65, 85); // Text secondary
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);

    section.points.forEach((point) => {
      const splitText = doc.splitTextToSize(`• ${point}`, pageWidth - margin * 2 - 5);
      
      // Check for page break within points
      if (cursorY + (splitText.length * 7) > pageHeight - 20) {
        doc.addPage();
        cursorY = 20;
      }

      doc.text(splitText, margin + 5, cursorY);
      cursorY += (splitText.length * 7);
    });

    cursorY += 10; // Space between sections
  });

  // Footer on all pages
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text(`Deepak Kumar — BA Portfolio | Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
  }

  // Save the PDF
  const fileName = `${note.title.replace(/\s+/g, '_')}_Notes.pdf`;
  doc.save(fileName);
};
