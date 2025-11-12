// 🔧 File: backend/tools/pdf-rotate.js
// 🔗 Farm Ready — ruota tutte le pagine del PDF

const fs = require('fs');
const { PDFDocument, degrees } = require('pdf-lib');
const { saveBufferToTmp } = require('../core/pdfTools');

module.exports = {
  async run({ filesMeta, requestId, params }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un solo PDF da ruotare');
    }

    const rotation = Number(params.rotation || 90);
    if (![90, 180, 270].includes(rotation)) {
      throw new Error('La rotazione deve essere 90, 180 o 270 gradi');
    }

    const buffer = fs.readFileSync(filesMeta[0].filePath);
    const pdfDoc = await PDFDocument.load(buffer);
    const pages = pdfDoc.getPages();

    pages.forEach((page) => {
      const currentRotation = page.getRotation().angle;
      const newRotation = (currentRotation + rotation) % 360;
      page.setRotation(degrees(newRotation));
    });

    const rotatedBuffer = await pdfDoc.save();
    const outputPath = saveBufferToTmp(rotatedBuffer, { requestId, suffix: `rotated-${rotation}` });

    return {
      rotation,
      outputSizeBytes: rotatedBuffer.length,
      outputFile: {
        name: `${requestId}-rotated-${rotation}.pdf`,
        mimeType: 'application/pdf',
        base64: rotatedBuffer.toString('base64'),
        tempPath: outputPath,
      },
    };
  },
};

