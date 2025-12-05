// 🔧 File: backend/tools/pdf-remove-pages.js
// 🔗 Rimuove pagine specifiche da PDF (simile a delete-pages ma con interfaccia diversa)

const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length === 0) {
      throw new Error('Carica un file PDF');
    }

    const pagesToRemove = params.pages || ''; // Es: "1,3,5" o "1-5"
    
    if (!pagesToRemove) {
      throw new Error('Specifica le pagine da rimuovere (es: 1,3,5 o 1-5)');
    }

    try {
      const file = filesMeta[0];
      const pdfBuffer = fs.readFileSync(file.filePath);
      const pdfDoc = await PDFDocument.load(pdfBuffer);
      const totalPages = pdfDoc.getPageCount();
      
      // Parse pagine da rimuovere
      const pagesToDelete = new Set();
      const parts = pagesToRemove.split(',');
      
      parts.forEach(part => {
        part = part.trim();
        if (part.includes('-')) {
          const [start, end] = part.split('-').map(n => parseInt(n.trim(), 10));
          for (let i = start; i <= end; i++) {
            if (i >= 1 && i <= totalPages) {
              pagesToDelete.add(i - 1); // 0-indexed
            }
          }
        } else {
          const page = parseInt(part, 10);
          if (page >= 1 && page <= totalPages) {
            pagesToDelete.add(page - 1);
          }
        }
      });
      
      // Crea nuovo PDF senza le pagine da rimuovere
      const newDoc = await PDFDocument.create();
      const pagesToKeep = [];
      
      for (let i = 0; i < totalPages; i++) {
        if (!pagesToDelete.has(i)) {
          pagesToKeep.push(i);
        }
      }
      
      if (pagesToKeep.length === 0) {
        throw new Error('Non puoi rimuovere tutte le pagine');
      }
      
      const copiedPages = await newDoc.copyPages(pdfDoc, pagesToKeep);
      copiedPages.forEach(page => newDoc.addPage(page));
      
      const pdfBytes = await newDoc.save();
      const outputPath = `/tmp/${requestId}-removed.pdf`;
      fs.writeFileSync(outputPath, pdfBytes);
      
      return {
        outputSizeBytes: pdfBytes.length,
        pagesRemoved: pagesToDelete.size,
        pagesKept: pagesToKeep.length,
        originalPages: totalPages,
        outputFile: {
          name: `${requestId}-removed.pdf`,
          mimeType: 'application/pdf',
          base64: pdfBytes.toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante la rimozione: ${error.message}`);
    }
  },
};


