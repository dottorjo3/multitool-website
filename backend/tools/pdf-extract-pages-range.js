// 🔧 File: backend/tools/pdf-extract-pages-range.js
// 🔗 Estrae range di pagine da PDF

const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length === 0) {
      throw new Error('Carica un file PDF');
    }

    const range = params.range || ''; // Es: "1-5" o "1,3,5" o "1-3,5-7"
    
    if (!range) {
      throw new Error('Specifica un range di pagine (es: 1-5 o 1,3,5)');
    }

    try {
      const file = filesMeta[0];
      const pdfBuffer = fs.readFileSync(file.filePath);
      const sourceDoc = await PDFDocument.load(pdfBuffer);
      const totalPages = sourceDoc.getPageCount();
      
      // Parse range
      const pagesToExtract = [];
      const parts = range.split(',');
      
      parts.forEach(part => {
        part = part.trim();
        if (part.includes('-')) {
          const [start, end] = part.split('-').map(n => parseInt(n.trim(), 10));
          for (let i = start; i <= end; i++) {
            if (i >= 1 && i <= totalPages) {
              pagesToExtract.push(i - 1); // 0-indexed
            }
          }
        } else {
          const page = parseInt(part, 10);
          if (page >= 1 && page <= totalPages) {
            pagesToExtract.push(page - 1);
          }
        }
      });
      
      if (pagesToExtract.length === 0) {
        throw new Error('Nessuna pagina valida trovata nel range');
      }
      
      const newDoc = await PDFDocument.create();
      const copiedPages = await newDoc.copyPages(sourceDoc, pagesToExtract);
      copiedPages.forEach(page => newDoc.addPage(page));
      
      const pdfBytes = await newDoc.save();
      const outputPath = `/tmp/${requestId}-extracted.pdf`;
      fs.writeFileSync(outputPath, pdfBytes);
      
      return {
        outputSizeBytes: pdfBytes.length,
        pagesExtracted: pagesToExtract.length,
        originalPages: totalPages,
        outputFile: {
          name: `${requestId}-extracted.pdf`,
          mimeType: 'application/pdf',
          base64: pdfBytes.toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante l'estrazione: ${error.message}`);
    }
  },
};


