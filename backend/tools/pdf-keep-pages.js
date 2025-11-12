// 🔧 File: backend/tools/pdf-keep-pages.js
// 🔗 Farm Ready — estrae solo le pagine indicate dal PDF

const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const { saveBufferToTmp } = require('../core/pdfTools');

function parsePagesList(pagesInput, totalPages) {
  const cleaned = (pagesInput || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  if (cleaned.length === 0) {
    throw new Error('Elenca almeno una pagina da estrarre, es: 1,3,5-7');
  }

  const pagesToKeep = new Set();

  cleaned.forEach((token) => {
    if (token.includes('-')) {
      const [startStr, endStr] = token.split('-').map((part) => part.trim());
      const start = Number(startStr);
      const end = Number(endStr);
      if (
        Number.isNaN(start)
        || Number.isNaN(end)
        || start < 1
        || end < start
        || end > totalPages
      ) {
        throw new Error(`Intervallo non valido: "${token}"`);
      }
      for (let page = start; page <= end; page += 1) {
        pagesToKeep.add(page);
      }
    } else {
      const pageNumber = Number(token);
      if (
        Number.isNaN(pageNumber)
        || pageNumber < 1
        || pageNumber > totalPages
      ) {
        throw new Error(`Pagina non valida: "${token}"`);
      }
      pagesToKeep.add(pageNumber);
    }
  });

  return Array.from(pagesToKeep).sort((a, b) => a - b);
}

module.exports = {
  async run({ filesMeta, params, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un solo PDF da elaborare');
    }

    const buffer = fs.readFileSync(filesMeta[0].filePath);
    const pdfDoc = await PDFDocument.load(buffer);
    const totalPages = pdfDoc.getPageCount();

    const pagesToKeepOrdered = parsePagesList(params.pages, totalPages);

    const newPdf = await PDFDocument.create();
    const zeroBasedIndices = pagesToKeepOrdered.map((pageNumber) => pageNumber - 1);
    const copiedPages = await newPdf.copyPages(pdfDoc, zeroBasedIndices);
    copiedPages.forEach((page) => newPdf.addPage(page));

    const outputBuffer = await newPdf.save();
    const outputPath = saveBufferToTmp(outputBuffer, {
      requestId,
      suffix: 'pages-selected',
    });

    return {
      keptPages: pagesToKeepOrdered,
      totalPages,
      outputSizeBytes: outputBuffer.length,
      outputFile: {
        name: `${requestId}-pages-selected.pdf`,
        mimeType: 'application/pdf',
        base64: outputBuffer.toString('base64'),
        tempPath: outputPath,
      },
    };
  },
};


