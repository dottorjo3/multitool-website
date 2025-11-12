// 🔧 File: backend/tools/pdf-extract-images.js
// 🔗 Farm Ready — estrae immagini dal PDF tramite pdfimages (Poppler)

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { PDFIMAGES_PATH, TMP_DIR } = require('../core/qpdf');

function runPdfImages(args, { cwd = TMP_DIR } = {}) {
  if (!fs.existsSync(PDFIMAGES_PATH)) {
    throw new Error(`pdfimages non trovato. Verifica il percorso: ${PDFIMAGES_PATH}`);
  }

  return new Promise((resolve, reject) => {
    const child = spawn(PDFIMAGES_PATH, args, {
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
        resolve();
      } else {
        reject(new Error(stderr.trim() || `pdfimages exited with code ${code}`));
      }
    });
  });
}

module.exports = {
  async run({ filesMeta, params, requestId, helpers }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un solo PDF da analizzare');
    }

    const format = params.format || 'png'; // png, tiff, jpeg, jp2, jbig2, ccitt
    const allowedFormats = ['png', 'tiff', 'jpeg', 'jpg', 'jp2', 'jbig2', 'ccitt'];
    if (!allowedFormats.includes(format)) {
      throw new Error(`Formato non supportato: ${format}`);
    }

    const baseName = path.resolve(TMP_DIR, `${requestId}-img`);
    const args = [];

    if (format === 'png') args.push('-png');
    if (format === 'tiff') args.push('-tiff');
    if (format === 'jpeg' || format === 'jpg') args.push('-j');
    if (format === 'jp2') args.push('-jp2');
    if (format === 'jbig2') args.push('-jbig2');
    if (format === 'ccitt') args.push('-ccitt');

    if (params.includePageNumber === 'true') {
      args.push('-p');
    }

    args.push(filesMeta[0].filePath, baseName);

    await runPdfImages(args);

    // Recuperiamo i file generati
    const generatedFiles = fs.readdirSync(TMP_DIR)
      .filter((filename) => filename.startsWith(`${requestId}-img`))
      .map((filename) => path.resolve(TMP_DIR, filename));

    if (generatedFiles.length === 0) {
      throw new Error('Nessuna immagine trovata nel PDF');
    }

    const images = generatedFiles.map((filePath) => {
      const buffer = fs.readFileSync(filePath);
      return {
        name: path.basename(filePath),
        size: buffer.length,
        base64: buffer.toString('base64'),
        mimeType: format === 'png'
          ? 'image/png'
          : format === 'tiff'
            ? 'image/tiff'
            : format === 'jp2'
              ? 'image/jp2'
              : format === 'jbig2'
                ? 'image/jbig2'
                : format === 'ccitt'
                  ? 'image/ccitt'
                  : 'image/jpeg',
        tempPath: filePath,
      };
    });

    return {
      extractedImages: images,
      count: images.length,
    };
  },
};


