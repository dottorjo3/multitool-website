// 🔧 File: backend/tools/pdf-to-html.js
// 🔗 Farm Ready — converte PDF in HTML (single file) usando pdftohtml (Poppler)

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { PDFTOHTML_PATH, TMP_DIR } = require('../core/qpdf');

function runPdftohtml(args, { cwd = TMP_DIR } = {}) {
  if (!fs.existsSync(PDFTOHTML_PATH)) {
    throw new Error(`pdftohtml non trovato. Verifica il percorso: ${PDFTOHTML_PATH}`);
  }

  return new Promise((resolve, reject) => {
    const child = spawn(PDFTOHTML_PATH, args, {
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
        reject(new Error(stderr.trim() || `pdftohtml exited with code ${code}`));
      }
    });
  });
}

module.exports = {
  async run({ filesMeta, params, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un solo PDF da convertire');
    }

    const inputPath = filesMeta[0].filePath;
    const outputHtml = path.resolve(TMP_DIR, `${requestId}-converted.html`);

    const args = [
      '-noframes',
      '-s',
      '-p',
    ];

    if (params.zoom) {
      const zoom = Number(params.zoom);
      if (!Number.isNaN(zoom) && zoom > 0) {
        args.push('-zoom', String(zoom));
      }
    }

    if (params.firstPage) {
      args.push('-f', String(params.firstPage));
    }
    if (params.lastPage) {
      args.push('-l', String(params.lastPage));
    }

    args.push(inputPath, outputHtml);

    await runPdftohtml(args);

    if (!fs.existsSync(outputHtml)) {
      throw new Error('Conversione non riuscita: file HTML non generato');
    }

    const htmlContent = fs.readFileSync(outputHtml, 'utf8');

    return {
      html: htmlContent,
      length: htmlContent.length,
      outputFile: {
        name: `${requestId}.html`,
        mimeType: 'text/html',
        base64: Buffer.from(htmlContent, 'utf8').toString('base64'),
        tempPath: outputHtml,
      },
    };
  },
};


