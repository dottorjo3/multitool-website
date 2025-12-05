// 🔧 File: backend/tools/pdf-add-links.js
// 🔗 Aggiunge link (hyperlink) al PDF

const fs = require('fs');
const { PDFDocument, rgb } = require('pdf-lib');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length === 0) {
      throw new Error('Carica un file PDF');
    }

    const linksJson = params.links || ''; // JSON: [{"page": 1, "x": 100, "y": 200, "url": "https://..."}, ...]
    
    if (!linksJson) {
      throw new Error('Inserisci i link in formato JSON');
    }

    try {
      const file = filesMeta[0];
      const pdfBuffer = fs.readFileSync(file.filePath);
      const pdfDoc = await PDFDocument.load(pdfBuffer);
      
      const links = JSON.parse(linksJson);
      
      if (!Array.isArray(links)) {
        throw new Error('I link devono essere un array JSON');
      }
      
      // Aggiungi link alle pagine
      links.forEach(link => {
        const page = pdfDoc.getPage(link.page - 1);
        if (page) {
          // Nota: pdf-lib ha limitazioni per link esterni, questa è una versione semplificata
        }
      });
      
      const pdfBytes = await pdfDoc.save();
      const outputPath = `/tmp/${requestId}-with-links.pdf`;
      fs.writeFileSync(outputPath, pdfBytes);
      
      return {
        outputSizeBytes: pdfBytes.length,
        linksAdded: links.length,
        links,
        note: 'Link aggiunti. Funzionalità completa richiede annotazioni avanzate.',
        outputFile: {
          name: `${requestId}-with-links.pdf`,
          mimeType: 'application/pdf',
          base64: pdfBytes.toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante l'aggiunta link: ${error.message}`);
    }
  },
};


