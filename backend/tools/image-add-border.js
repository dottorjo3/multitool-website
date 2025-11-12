// 🔧 File: backend/tools/image-add-border.js
// 🔗 Aggiunge un bordo uniforme attorno all'immagine

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { TMP_DIR } = require('../core/config');

function hexToRgb(hex) {
  const sanitized = hex.replace('#', '');
  const normalized = sanitized.length === 3
    ? sanitized.split('').map((c) => c + c).join('')
    : sanitized;
  const intVal = parseInt(normalized, 16);
  return {
    r: (intVal >> 16) & 255,
    g: (intVal >> 8) & 255,
    b: intVal & 255,
    alpha: 1,
  };
}

module.exports = {
  async run({ filesMeta, params, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica una singola immagine da elaborare');
    }

    const border = params.border ? Number(params.border) : 20;
    if (Number.isNaN(border) || border < 1 || border > 500) {
      throw new Error('Lo spessore del bordo deve essere tra 1 e 500 pixel');
    }

    const color = params.color || '#000000';
    const rgb = hexToRgb(color);

    const file = filesMeta[0];
    const extension = path.extname(file.originalName).replace('.', '').toLowerCase() || 'jpeg';
    const safeExtension = ['jpeg', 'jpg', 'png', 'webp', 'avif'].includes(extension) ? extension : 'jpeg';
    const outputName = `${requestId}-border.${safeExtension === 'jpg' ? 'jpg' : safeExtension}`;
    const outputPath = path.resolve(TMP_DIR, outputName);

    const pipeline = sharp(file.filePath)
      .extend({
        top: border,
        bottom: border,
        left: border,
        right: border,
        background: rgb,
      });

    switch (safeExtension) {
      case 'png':
        await pipeline.png({ compressionLevel: 9 }).toFile(outputPath);
        break;
      case 'webp':
        await pipeline.webp({ quality: 85 }).toFile(outputPath);
        break;
      case 'avif':
        await pipeline.avif({ quality: 60 }).toFile(outputPath);
        break;
      default:
        await pipeline.jpeg({ quality: 90 }).toFile(outputPath);
        break;
    }

    const buffer = fs.readFileSync(outputPath);

    return {
      border,
      color,
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



