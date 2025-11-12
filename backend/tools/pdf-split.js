// 🔧 File: backend/tools/pdf-split.js
// 🔗 Farm Ready — divide un PDF in pagine singole

const fs = require('fs');
const path = require('path');
const { splitPDF, saveBufferToTmp } = require('../core/pdfTools');

module.exports = {
  async run({ filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un solo PDF da dividere');
    }

    const buffer = fs.readFileSync(filesMeta[0].filePath);
    const parts = await splitPDF(buffer);

    const outputs = parts.map((partBuffer, index) => {
      const outputPath = saveBufferToTmp(partBuffer, {
        requestId,
        suffix: `page-${index + 1}`,
      });

      return {
        name: `${requestId}-page-${index + 1}.pdf`,
        mimeType: 'application/pdf',
        base64: partBuffer.toString('base64'),
        tempPath: outputPath,
      };
    });

    return {
      pages: outputs,
      outputSizeBytes: outputs.reduce((acc, curr) => acc + Buffer.from(curr.base64, 'base64').length, 0),
      durationMs: null,
      message: `PDF suddiviso in ${outputs.length} pagine`,
    };
  },
};

