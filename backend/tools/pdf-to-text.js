// 🔧 File: backend/tools/pdf-to-text.js
// 🔗 Farm Ready — converte PDF in testo (layout preservato) con pdftotext (Poppler)

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { PDFTOTEXT_PATH, TMP_DIR } = require('../core/qpdf');

function runPdftotext(args, { cwd = TMP_DIR } = {}) {
  if (!fs.existsSync(PDFTOTEXT_PATH)) {
    throw new Error(`pdftotext non trovato. Verifica il percorso: ${PDFTOTEXT_PATH}`);
  }

  return new Promise((resolve, reject) => {
    const child = spawn(PDFTOTEXT_PATH, args, {
      cwd,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stderr = '';
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('error', (error) => reject(error));

    child.on('close', (code) => {
      if (code === 0) {
        resolve(stderr.trim());
      } else {
        reject(new Error(stderr.trim() || `pdftotext exited with code ${code}`));
      }
    });
  });
}

module.exports = {
  async run({ filesMeta, params, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un solo PDF da convertire in testo');
    }

    const inputPath = filesMeta[0].filePath;
    const outputTxt = path.resolve(TMP_DIR, `${requestId}-text.txt`);

    const args = [];

    if (params.raw === 'true') {
      args.push('-raw');
    } else {
      args.push('-layout');
    }

    if (params.firstPage) {
      args.push('-f', String(params.firstPage));
    }
    if (params.lastPage) {
      args.push('-l', String(params.lastPage));
    }

    args.push(inputPath, outputTxt);

    await runPdftotext(args);

    if (!fs.existsSync(outputTxt)) {
      throw new Error('Conversione non riuscita: file di testo non generato');
    }

    const textContent = fs.readFileSync(outputTxt, 'utf8');

    return {
      text: textContent,
      length: textContent.length,
      outputFile: {
        name: `${requestId}.txt`,
        mimeType: 'text/plain',
        base64: Buffer.from(textContent, 'utf8').toString('base64'),
        tempPath: outputTxt,
      },
    };
  },
};


