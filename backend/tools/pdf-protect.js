// 🔧 File: backend/tools/pdf-protect.js
// 🔗 Farm Ready — aggiunge password a un PDF utilizzando qpdf

const fs = require('fs');
const { runQpdf, buildTempPath } = require('../core/qpdf');

module.exports = {
  async run({ filesMeta, params, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un solo PDF da proteggere');
    }

    const userPassword = params.userPassword;
    if (!userPassword || userPassword.length < 4) {
      throw new Error('Inserisci una password utente (minimo 4 caratteri)');
    }

    const ownerPassword = params.ownerPassword && params.ownerPassword.length >= 4
      ? params.ownerPassword
      : userPassword;

    const inputPath = filesMeta[0].filePath;
    const outputPath = buildTempPath(requestId, 'protected');

    await runQpdf([
      '--encrypt',
      userPassword,
      ownerPassword,
      '256',
      '--',
      inputPath,
      outputPath,
    ]);

    const outputBuffer = fs.readFileSync(outputPath);

    return {
      outputSizeBytes: outputBuffer.length,
      outputFile: {
        name: `${requestId}-protected.pdf`,
        mimeType: 'application/pdf',
        base64: outputBuffer.toString('base64'),
        tempPath: outputPath,
      },
    };
  },
};


