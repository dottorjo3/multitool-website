// 🔧 File: backend/tools/pdf-compress.js
// 🔗 Farm Ready — ricrea il PDF con oggetti compressi (riduzione base)

const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const { saveBufferToTmp } = require('../core/pdfTools');

module.exports = {
  async run({ filesMeta, requestId, params }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un solo PDF da comprimere');
    }

    const quality = Number(params.quality || 75);
    if (quality < 1 || quality > 100) {
      throw new Error('La qualità deve essere un numero tra 1 e 100');
    }

    const originalBuffer = fs.readFileSync(filesMeta[0].filePath);
    const pdfDoc = await PDFDocument.load(originalBuffer);
    const compressedBuffer = await pdfDoc.save({ useObjectStreams: true });

    const outputPath = saveBufferToTmp(compressedBuffer, { requestId, suffix: 'compressed' });

    return {
      durationMs: null,
      originalSizeBytes: originalBuffer.length,
      outputSizeBytes: compressedBuffer.length,
      compressionRatio: Number((compressedBuffer.length / originalBuffer.length).toFixed(2)),
      outputFile: {
        name: `${requestId}-compressed.pdf`,
        mimeType: 'application/pdf',
        base64: compressedBuffer.toString('base64'),
        tempPath: outputPath,
      },
    };
  },
};

