// 🔧 File: backend/tools/pdf-delete-pages.js
// 🔗 Farm Ready — elimina le pagine specificate da un PDF

const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const { saveBufferToTmp } = require('../core/pdfTools');

function parsePagesList(pagesInput, totalPages) {
  const cleaned = (pagesInput || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  if (cleaned.length === 0) {
    throw new Error('Elenca almeno una pagina da eliminare, es: 2,4,6-8');
  }

  const pagesToRemove = new Set();

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
        pagesToRemove.add(page);
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
      pagesToRemove.add(pageNumber);
    }
  });

  return pagesToRemove;
}

module.exports = {
  async run({ filesMeta, params, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un solo PDF da modificare');
    }

    const buffer = fs.readFileSync(filesMeta[0].filePath);
    const pdfDoc = await PDFDocument.load(buffer);
    const totalPages = pdfDoc.getPageCount();

    const pagesToRemove = parsePagesList(params.pages, totalPages);

    if (pagesToRemove.size >= totalPages) {
      throw new Error('Non puoi eliminare tutte le pagine del PDF');
    }

    const newPdf = await PDFDocument.create();
    const originalIndices = pdfDoc.getPageIndices();

    const keptPages = [];

    // Copiamo solo le pagine che NON sono da eliminare
    originalIndices.forEach((pageIndex) => {
      const humanIndex = pageIndex + 1;
      if (!pagesToRemove.has(humanIndex)) {
        keptPages.push(pageIndex);
      }
    });

    const copiedPages = await newPdf.copyPages(pdfDoc, keptPages);
    copiedPages.forEach((page) => newPdf.addPage(page));

    const outputBuffer = await newPdf.save();
    const outputPath = saveBufferToTmp(outputBuffer, {
      requestId,
      suffix: 'pages-kept',
    });

    return {
      removedPages: Array.from(pagesToRemove).sort((a, b) => a - b),
      remainingPages: keptPages.length,
      outputSizeBytes: outputBuffer.length,
      outputFile: {
        name: `${requestId}-pages-kept.pdf`,
        mimeType: 'application/pdf',
        base64: outputBuffer.toString('base64'),
        tempPath: outputPath,
      },
    };
  },
};


