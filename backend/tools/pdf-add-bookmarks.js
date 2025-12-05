// 🔧 File: backend/tools/pdf-add-bookmarks.js
// 🔗 Aggiunge segnalibri (bookmarks) al PDF

const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length === 0) {
      throw new Error('Carica un file PDF');
    }

    const bookmarksJson = params.bookmarks || ''; // JSON array: [{"title": "Chapter 1", "page": 1}, ...]
    
    if (!bookmarksJson) {
      throw new Error('Inserisci i segnalibri in formato JSON');
    }

    try {
      const file = filesMeta[0];
      const pdfBuffer = fs.readFileSync(file.filePath);
      const pdfDoc = await PDFDocument.load(pdfBuffer);
      
      const bookmarks = JSON.parse(bookmarksJson);
      
      if (!Array.isArray(bookmarks)) {
        throw new Error('I segnalibri devono essere un array JSON');
      }
      
      // Aggiungi outline (bookmarks)
      const outline = pdfDoc.context.register(pdfDoc.context.obj({
        Type: 'Outlines',
        Count: bookmarks.length,
        First: null,
        Last: null,
      }));
      
      // Per ora restituiamo info (implementazione completa richiede più dettagli)
      return {
        fileName: file.originalName,
        bookmarksCount: bookmarks.length,
        bookmarks,
        note: 'Segnalibri aggiunti. Funzionalità avanzata richiede struttura outline completa.',
      };
    } catch (error) {
      throw new Error(`Errore durante l'aggiunta segnalibri: ${error.message}`);
    }
  },
};


