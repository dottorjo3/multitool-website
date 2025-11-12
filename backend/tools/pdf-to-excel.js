// 🔧 File: backend/tools/pdf-to-excel.js
// 🔗 Farm Ready — converte PDF in XLSX utilizzando LibreOffice headless

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { LIBREOFFICE_PATH, TMP_DIR } = require('../core/qpdf');

function runLibreOffice(args, { cwd = TMP_DIR } = {}) {
  if (!fs.existsSync(LIBREOFFICE_PATH)) {
    throw new Error(`LibreOffice (soffice) non trovato. Verifica il percorso: ${LIBREOFFICE_PATH}`);
  }

  return new Promise((resolve, reject) => {
    const child = spawn(LIBREOFFICE_PATH, args, {
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
        reject(new Error(stderr.trim() || `LibreOffice exited with code ${code}`));
      }
    });
  });
}

module.exports = {
  async run({ filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un solo PDF da convertire in Excel');
    }

    const inputPath = filesMeta[0].filePath;
    const outputDir = path.resolve(TMP_DIR, `${requestId}-xlsx`);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const args = [
      '--headless',
      '--nologo',
      '--nodefault',
      '--nofirststartwizard',
      '--norestore',
      '--convert-to',
      'xlsx',
      inputPath,
      '--outdir',
      outputDir,
    ];

    await runLibreOffice(args);

    const generatedFiles = fs.readdirSync(outputDir)
      .filter((filename) => filename.toLowerCase().endsWith('.xlsx'))
      .map((filename) => path.resolve(outputDir, filename));

    if (generatedFiles.length === 0) {
      throw new Error('Conversione non riuscita: nessun file XLSX generato');
    }

    const xlsxPath = generatedFiles[0];
    const buffer = fs.readFileSync(xlsxPath);

    return {
      outputFile: {
        name: path.basename(xlsxPath),
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        base64: buffer.toString('base64'),
        tempPath: xlsxPath,
      },
      size: buffer.length,
    };
  },
};


