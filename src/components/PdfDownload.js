import jsPDF from 'jspdf';

const options = {
     // reduce the size of image
    image: { type: "jpeg", quality: 0.6 },
  };

function createPDF(flashcardData) {

   const doc = new jsPDF(options) 

   //Set background color for entire PDF
   doc.setFillColor(255, 255, 255); 
   doc.rect(0, 0, 210, 297, "F");

   //Add group image
   if (flashcardData.groupImage) {
    const imageSize = 40;
    const x = 10;
    const y = 10;

    doc.addImage(flashcardData.groupImage, "JPEG", x, y, imageSize, imageSize);
  }

    // Add group name at the right of group image
    doc.setFontSize(40);
    doc.setTextColor(29, 53, 87); 
    doc.setFont("helvetica", "bold");
    doc.text(flashcardData.groupName, 90, 30);

    // Add group description below group name and group image
  doc.setFontSize(16);
  doc.setTextColor(64, 61, 57);
  doc.text(doc.splitTextToSize(flashcardData.groupDescription, 200), 10, 65);

  //Initial Y position
  let y_Position = 120;

  flashcardData.term.forEach((term, termIndex) => {
    // Calculate term content height dynamically
    doc.setFontSize(12);
    doc.setFillColor(255, 255, 255);
    const termDefinitionLines = doc.splitTextToSize(term.termDefinition, 100);
    const termImageHeight = term.termImage ? 60 : 0; 
    const totalHeight = Math.max(
      termImageHeight + termDefinitionLines.length * 10, 
      70
    );

    // Check if there's enough space for the current term on the current page
    if (y_Position + 50 > 290) {
      doc.addPage(); // If not, add a new page
      y_Position = 20; 
    }

    // Add serial number
    doc.setFontSize(15);
    doc.setTextColor(64, 61, 57);
    doc.text(`${termIndex + 1}. ${term.termName}`, 10, y_Position);

    // Add term image (if it exists)
    if (term.termImage) {
      doc.addImage(term.termImage, "JPEG", 15, y_Position + 10, 45, 45); 
    }

     // Add term definition
     doc.setFontSize(12);
     // doc.setFont("Times", "Roman");
     doc.setTextColor(0, 48, 73);
     doc.text(termDefinitionLines, 83, y_Position + 10);
 
     // Update the Y position for the next term content
     y_Position += totalHeight;
   });
 
   // Save the PDF with all terms
   doc.save("flashcard-details-all-terms.pdf");
 }

 
 function PdfDownload({ buttonLabel, flashcardData}) {
    const handleDownload = () => {
        createPDF(flashcardData);
      };
    
      return (
        <div>
          <button onClick={handleDownload}>{buttonLabel}</button>
        </div>
      );
 }
 
 export default PdfDownload