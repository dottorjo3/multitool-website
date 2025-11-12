// 🔧 File: backend/tools/pdf-reorder-pages.js
// 🔗 Cambia l'ordine delle pagine in base a una sequenza fornita

const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const { saveBufferToTmp } = require('../core/pdfTools');

function parseOrder(orderString, pageCount) {
  if (!orderString || typeof orderString !== 'string') {
    throw new Error('Inserisci la sequenza di pagine (es. 3,1,2)');
  }

  const parts = orderString
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => Number(part));

  if (!parts.length) {
    throw new Error('Sequenza non valida. Usa numeri separati da virgola');
  }

  parts.forEach((page) => {
    if (!Number.isInteger(page) || page < 1 || page > pageCount) {
      throw new Error(`Numero di pagina non valido: ${page}`);
    }
  });

  return parts;
}

module.exports = {
  async run({ filesMeta, params, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un solo PDF da riordinare');
    }

    const buffer = fs.readFileSync(filesMeta[0].filePath);
    const pdfDoc = await PDFDocument.load(buffer);
    const pageCount = pdfDoc.getPageCount();

    const order = parseOrder(params.order, pageCount);

    const newPdf = await PDFDocument.create();
    const copied = await newPdf.copyPages(pdfDoc, order.map((index) => index - 1));
    copied.forEach((page) => newPdf.addPage(page));

    const pdfBytes = await newPdf.save();
    const outputPath = saveBufferToTmp(pdfBytes, { requestId, suffix: 'reordered' });

    return {
      originalPages: pageCount,
      newPages: order.length,
      order,
      outputSizeBytes: pdfBytes.length,
      outputFile: {
        name: `${requestId}-reordered.pdf`,
        mimeType: 'application/pdf',
        base64: Buffer.from(pdfBytes).toString('base64'),
        tempPath: outputPath,
      },
    };
  },
};



