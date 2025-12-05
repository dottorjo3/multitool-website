// 🔧 File: backend/tools/pdf-extract-attachments.js
// 🔗 Estrae allegati da PDF

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
      
      // Estrai allegati (embedded files)
      const attachments = [];
      const names = pdfDoc.context.enumerateIndirectObjects();
      
      for (const [ref, obj] of names) {
        if (obj instanceof PDFDocument && obj.dict.get('Type')?.toString() === '/EmbeddedFile') {
          // Trovato un allegato
          attachments.push({
            name: obj.dict.get('F')?.toString() || 'attachment',
            size: obj.contentStream?.length || 0,
          });
        }
      }
      
      return {
        fileName: file.originalName,
        attachmentsFound: attachments.length,
        attachments,
        note: attachments.length > 0 
          ? 'Allegati trovati. Estrazione file richiede parsing avanzato.'
          : 'Nessun allegato trovato nel PDF.',
      };
    } catch (error) {
      throw new Error(`Errore durante l'estrazione: ${error.message}`);
    }
  },
};


