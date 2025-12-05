// 🔧 File: backend/tools/pdf-add-attachment.js
// 🔗 Aggiunge allegati al PDF

const fs = require('fs');
const { PDFDocument, PDFName, PDFString } = require('pdf-lib');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length < 2) {
      throw new Error('Carica un PDF e almeno un file da allegare');
    }

    try {
      const [pdfFile, ...attachmentFiles] = filesMeta;
      const pdfBuffer = fs.readFileSync(pdfFile.filePath);
      const pdfDoc = await PDFDocument.load(pdfBuffer);
      
      // Aggiungi allegati
      for (const attachFile of attachmentFiles) {
        const attachBuffer = fs.readFileSync(attachFile.filePath);
        const attachment = await pdfDoc.attach(attachBuffer, attachFile.originalName, {
          mimeType: attachFile.mimetype || 'application/octet-stream',
        });
      }
      
      const pdfBytes = await pdfDoc.save();
      const outputPath = `/tmp/${requestId}-with-attachments.pdf`;
      fs.writeFileSync(outputPath, pdfBytes);
      
      return {
        outputSizeBytes: pdfBytes.length,
        attachmentsAdded: attachmentFiles.length,
        attachments: attachmentFiles.map(f => ({
          name: f.originalName,
          size: fs.statSync(f.filePath).size,
        })),
        outputFile: {
          name: `${requestId}-with-attachments.pdf`,
          mimeType: 'application/pdf',
          base64: pdfBytes.toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante l'aggiunta allegati: ${error.message}`);
    }
  },
};


