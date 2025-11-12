// 🔧 File: backend/tools/image-tint.js
// 🔗 Applica una tinta colorata sull'immagine

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { TMP_DIR } = require('../core/config');

function normalizeHex(hex) {
  const sanitized = hex.replace('#', '');
  if (![3, 6].includes(sanitized.length)) {
    throw new Error('Colore HEX non valido');
  }
  return sanitized.length === 3
    ? sanitized.split('').map((c) => c + c).join('')
    : sanitized;
}

module.exports = {
  async run({ filesMeta, params, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica una singola immagine da colorare');
    }

    const color = params.color || '#FF6B6B';
    const hex = normalizeHex(color);

    const file = filesMeta[0];
    const extension = path.extname(file.originalName).replace('.', '').toLowerCase() || 'jpeg';
    const safeExtension = ['jpeg', 'jpg', 'png', 'webp', 'avif'].includes(extension) ? extension : 'jpeg';
    const outputName = `${requestId}-tinted.${safeExtension === 'jpg' ? 'jpg' : safeExtension}`;
    const outputPath = path.resolve(TMP_DIR, outputName);

    const pipeline = sharp(file.filePath).tint(`#${hex}`);

    switch (safeExtension) {
      case 'png':
        await pipeline.png({ compressionLevel: 9 }).toFile(outputPath);
        break;
      case 'webp':
        await pipeline.webp({ quality: params.quality ? Number(params.quality) : 85 }).toFile(outputPath);
        break;
      case 'avif':
        await pipeline.avif({ quality: params.quality ? Number(params.quality) : 60 }).toFile(outputPath);
        break;
      default:
        await pipeline.jpeg({ quality: params.quality ? Number(params.quality) : 85 }).toFile(outputPath);
        break;
    }

    const buffer = fs.readFileSync(outputPath);

    return {
      color: `#${hex}`,
      outputFile: {
        name: outputName,
        mimeType: `image/${safeExtension === 'jpg' ? 'jpeg' : safeExtension}`,
        base64: buffer.toString('base64'),
        tempPath: outputPath,
      },
      outputSizeBytes: buffer.length,
    };
  },
};



