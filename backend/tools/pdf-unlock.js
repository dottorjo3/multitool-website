// 🔧 File: backend/tools/pdf-unlock.js
// 🔗 Farm Ready — rimuove la password da un PDF tramite qpdf

const fs = require('fs');
const { runQpdf, buildTempPath } = require('../core/qpdf');

module.exports = {
  async run({ filesMeta, params, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un solo PDF da sbloccare');
    }

    const password = params.password;
    if (!password || password.length < 1) {
      throw new Error('Inserisci la password del PDF');
    }

    const inputPath = filesMeta[0].filePath;
    const outputPath = buildTempPath(requestId, 'unlocked');

    await runQpdf([
      `--password=${password}`,
      '--decrypt',
      inputPath,
      outputPath,
    ]);

    const outputBuffer = fs.readFileSync(outputPath);

    return {
      outputSizeBytes: outputBuffer.length,
      outputFile: {
        name: `${requestId}-unlocked.pdf`,
        mimeType: 'application/pdf',
        base64: outputBuffer.toString('base64'),
        tempPath: outputPath,
      },
    };
  },
};


