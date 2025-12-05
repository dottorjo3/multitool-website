// 🔧 File: backend/tools/pdf-flatten.js
// 🔗 Appiattisce PDF (rimuove form fields, annotazioni)

const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length === 0) {
      throw new Error('Carica un file PDF');
    }

    try {
      const file = filesMeta[0];
      const pdfBuffer = fs.readFileSync(file.filePath);
      const pdfDoc = await PDFDocument.load(pdfBuffer);
      
      // Crea nuovo PDF copiando solo il contenuto delle pagine (no forms/annotations)
      const newDoc = await PDFDocument.create();
      const pages = pdfDoc.getPages();
      
      for (let i = 0; i < pages.length; i++) {
        const [copiedPage] = await newDoc.copyPages(pdfDoc, [i]);
        newDoc.addPage(copiedPage);
      }
      
      const pdfBytes = await newDoc.save();
      const outputPath = `/tmp/${requestId}-flattened.pdf`;
      fs.writeFileSync(outputPath, pdfBytes);
      
      return {
        outputSizeBytes: pdfBytes.length,
        pagesFlattened: pages.length,
        outputFile: {
          name: `${requestId}-flattened.pdf`,
          mimeType: 'application/pdf',
          base64: pdfBytes.toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante l'appiattimento: ${error.message}`);
    }
  },
};


