// 🔧 File: backend/tools/pdf-to-png.js
// 🔗 Crea PDF da immagini

const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length === 0) {
      throw new Error('Carica almeno un\'immagine');
    }

    try {
      const pdfDoc = await PDFDocument.create();
      
      for (const file of filesMeta) {
        const imageBuffer = fs.readFileSync(file.filePath);
        
        // Determina tipo immagine
        let image;
        if (file.mimetype === 'image/png') {
          image = await pdfDoc.embedPng(imageBuffer);
        } else if (file.mimetype === 'image/jpeg') {
          image = await pdfDoc.embedJpg(imageBuffer);
        } else {
          continue; // Skip non-image files
        }
        
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      }
      
      const pdfBytes = await pdfDoc.save();
      const outputPath = `/tmp/${requestId}-output.pdf`;
      fs.writeFileSync(outputPath, pdfBytes);
      
      return {
        outputSizeBytes: pdfBytes.length,
        pagesCreated: filesMeta.length,
        outputFile: {
          name: `${requestId}-output.pdf`,
          mimeType: 'application/pdf',
          base64: pdfBytes.toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante la creazione PDF: ${error.message}`);
    }
  },
};


