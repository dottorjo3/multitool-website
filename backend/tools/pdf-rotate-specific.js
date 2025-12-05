// 🔧 File: backend/tools/pdf-rotate-specific.js
// 🔗 Ruota pagine specifiche del PDF

const fs = require('fs');
const { PDFDocument, degrees } = require('pdf-lib');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length === 0) {
      throw new Error('Carica un file PDF');
    }

    const pages = params.pages || 'all'; // Es: "1,3,5" o "1-5"
    const angle = parseInt(params.angle, 10) || 90; // 90, 180, 270
    
    if (![90, 180, 270, -90].includes(angle)) {
      throw new Error('Angolo non valido (usa 90, 180, 270 o -90)');
    }

    try {
      const file = filesMeta[0];
      const pdfBuffer = fs.readFileSync(file.filePath);
      const pdfDoc = await PDFDocument.load(pdfBuffer);
      const totalPages = pdfDoc.getPageCount();
      
      // Parse pagine da ruotare
      const pagesToRotate = new Set();
      
      if (pages === 'all') {
        for (let i = 0; i < totalPages; i++) {
          pagesToRotate.add(i);
        }
      } else {
        const parts = pages.split(',');
        parts.forEach(part => {
          part = part.trim();
          if (part.includes('-')) {
            const [start, end] = part.split('-').map(n => parseInt(n.trim(), 10));
            for (let i = start; i <= end; i++) {
              if (i >= 1 && i <= totalPages) {
                pagesToRotate.add(i - 1);
              }
            }
          } else {
            const page = parseInt(part, 10);
            if (page >= 1 && page <= totalPages) {
              pagesToRotate.add(page - 1);
            }
          }
        });
      }
      
      // Ruota pagine
      const pagesList = pdfDoc.getPages();
      pagesToRotate.forEach(pageIndex => {
        pagesList[pageIndex].setRotation(degrees(angle));
      });
      
      const pdfBytes = await pdfDoc.save();
      const outputPath = `/tmp/${requestId}-rotated.pdf`;
      fs.writeFileSync(outputPath, pdfBytes);
      
      return {
        outputSizeBytes: pdfBytes.length,
        pagesRotated: pagesToRotate.size,
        angle,
        outputFile: {
          name: `${requestId}-rotated.pdf`,
          mimeType: 'application/pdf',
          base64: pdfBytes.toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante la rotazione: ${error.message}`);
    }
  },
};


