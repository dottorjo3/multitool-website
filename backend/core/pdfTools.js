// 🔧 File: backend/core/pdfTools.js
// 🔗 Farm Ready — funzioni riutilizzabili per PDF (basate su pdf-lib e pdf-parse)

const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const pdfParse = require('pdf-parse');

const { TMP_DIR } = require('./config');

async function mergePDFs(pdfBuffers) {
  const mergedPdf = await PDFDocument.create();

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < pdfBuffers.length; i++) {
    const pdf = await PDFDocument.load(pdfBuffers[i]);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  return mergedPdf.save();
}

async function splitPDF(pdfBuffer) {
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const outputs = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < pdfDoc.getPageCount(); i++) {
    const newPdf = await PDFDocument.create();
    const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
    newPdf.addPage(copiedPage);
    const pdfBytes = await newPdf.save();
    outputs.push(pdfBytes);
  }

  return outputs;
}

async function extractText(pdfBuffer) {
  const data = await pdfParse(pdfBuffer);
  return data.text;
}

function saveBufferToTmp(buffer, { requestId, suffix }) {
  const fileName = `${requestId}-${suffix}.pdf`;
  const filePath = path.resolve(TMP_DIR, fileName);
  fs.writeFileSync(filePath, buffer);
  return filePath;
}

module.exports = {
  mergePDFs,
  splitPDF,
  extractText,
  saveBufferToTmp,
};

