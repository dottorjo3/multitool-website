// 🔧 File: backend/tools/pdf-merge.js
// 🔗 Farm Ready — unisce più PDF in uno solo

const fs = require('fs');
const { mergePDFs, saveBufferToTmp } = require('../core/pdfTools');

module.exports = {
  async run({ filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length < 2) {
      throw new Error('Carica almeno due file PDF da unire');
    }

    const buffers = filesMeta.map((file) => fs.readFileSync(file.filePath));
    const mergedBuffer = await mergePDFs(buffers);

    const outputPath = saveBufferToTmp(mergedBuffer, { requestId, suffix: 'merged' });

    return {
      durationMs: null,
      outputSizeBytes: mergedBuffer.length,
      outputFile: {
        name: `${requestId}-merged.pdf`,
        mimeType: 'application/pdf',
        base64: mergedBuffer.toString('base64'),
        tempPath: outputPath,
      },
    };
  },
};

