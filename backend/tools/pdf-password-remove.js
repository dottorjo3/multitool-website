// 🔧 File: backend/tools/pdf-password-remove.js
// 🔗 Rimuove password da PDF (se conosciuta)

const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length === 0) {
      throw new Error('Carica un file PDF protetto');
    }

    const password = params.password || '';
    
    if (!password) {
      throw new Error('Inserisci la password del PDF');
    }

    try {
      const file = filesMeta[0];
      const pdfBuffer = fs.readFileSync(file.filePath);
      
      // Prova a caricare con password
      let pdfDoc;
      try {
        pdfDoc = await PDFDocument.load(pdfBuffer, { ignoreEncryption: false });
      } catch (error) {
        throw new Error('Password non corretta o PDF non protetto');
      }
      
      // Crea nuovo PDF senza password
      const newDoc = await PDFDocument.create();
      const pages = pdfDoc.getPages();
      
      for (let i = 0; i < pages.length; i++) {
        const [copiedPage] = await newDoc.copyPages(pdfDoc, [i]);
        newDoc.addPage(copiedPage);
      }
      
      // Copia metadata
      const metadata = await pdfDoc.getTitle();
      if (metadata) {
        newDoc.setTitle(metadata);
      }
      
      const pdfBytes = await newDoc.save();
      const outputPath = `/tmp/${requestId}-unlocked.pdf`;
      fs.writeFileSync(outputPath, pdfBytes);
      
      return {
        outputSizeBytes: pdfBytes.length,
        unlocked: true,
        outputFile: {
          name: `${requestId}-unlocked.pdf`,
          mimeType: 'application/pdf',
          base64: pdfBytes.toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante la rimozione password: ${error.message}`);
    }
  },
};


