// 🔧 File: backend/tools/pdf-compare.js
// 🔗 Confronta due PDF e mostra differenze

const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const pdf = require('pdf-parse');

module.exports = {
  async run({ params, filesMeta }) {
    if (!filesMeta || filesMeta.length !== 2) {
      throw new Error('Carica esattamente 2 file PDF da confrontare');
    }

    try {
      const [file1, file2] = filesMeta;
      const pdf1Buffer = fs.readFileSync(file1.filePath);
      const pdf2Buffer = fs.readFileSync(file2.filePath);
      
      const pdf1Data = await pdf(pdf1Buffer);
      const pdf2Data = await pdf(pdf2Buffer);
      
      const pdf1Doc = await PDFDocument.load(pdf1Buffer);
      const pdf2Doc = await PDFDocument.load(pdf2Buffer);
      
      const pages1 = pdf1Doc.getPageCount();
      const pages2 = pdf2Doc.getPageCount();
      
      const differences = {
        fileNames: [file1.originalName, file2.originalName],
        pageCount: {
          file1: pages1,
          file2: pages2,
          same: pages1 === pages2,
        },
        fileSize: {
          file1: pdf1Buffer.length,
          file2: pdf2Buffer.length,
          difference: pdf2Buffer.length - pdf1Buffer.length,
        },
        textLength: {
          file1: pdf1Data.text.length,
          file2: pdf2Data.text.length,
          same: pdf1Data.text.length === pdf2Data.text.length,
        },
        metadata: {
          same: JSON.stringify(pdf1Data.info) === JSON.stringify(pdf2Data.info),
        },
      };
      
      return {
        differences,
        summary: `PDF 1: ${pages1} pagine, ${pdf1Buffer.length} bytes | PDF 2: ${pages2} pagine, ${pdf2Buffer.length} bytes`,
      };
    } catch (error) {
      throw new Error(`Errore durante il confronto: ${error.message}`);
    }
  },
};


