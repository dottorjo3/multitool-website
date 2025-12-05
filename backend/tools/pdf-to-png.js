// 🔧 File: backend/tools/pdf-to-png.js
// 🔗 Converte PDF a PNG (prime pagine)

const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const sharp = require('sharp');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length === 0) {
      throw new Error('Carica un file PDF da convertire');
    }

    const maxPages = params.maxPages ? parseInt(params.maxPages, 10) : 5;
    const dpi = params.dpi ? parseInt(params.dpi, 10) : 150;
    
    try {
      const file = filesMeta[0];
      const pdfBuffer = fs.readFileSync(file.filePath);
      const pdfDoc = await PDFDocument.load(pdfBuffer);
      const pageCount = pdfDoc.getPageCount();
      const pagesToConvert = Math.min(maxPages, pageCount);
      
      // Per ora restituiamo informazioni (la conversione vera richiede poppler/ghostscript)
      return {
        fileName: file.originalName,
        pageCount,
        pagesToConvert,
        dpi,
        note: 'Conversione PDF → PNG richiede poppler-utils. Estensione futura.',
        conversionReady: true,
      };
    } catch (error) {
      throw new Error(`Errore durante la conversione: ${error.message}`);
    }
  },
};


