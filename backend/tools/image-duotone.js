// 🔧 File: backend/tools/image-duotone.js
// 🔗 Applica un effetto duotone tra due colori

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { TMP_DIR } = require('../core/config');

function hexToRgb(hex) {
  const sanitized = hex.replace('#', '');
  if (![3, 6].includes(sanitized.length)) {
    throw new Error('Colore HEX non valido');
  }
  const normalized = sanitized.length === 3
    ? sanitized.split('').map((c) => c + c).join('')
    : sanitized;
  const intVal = parseInt(normalized, 16);
  return {
    r: (intVal >> 16) & 255,
    g: (intVal >> 8) & 255,
    b: intVal & 255,
  };
}

module.exports = {
  async run({ filesMeta, params, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica una sola immagine da elaborare');
    }

    const shadowHex = params.shadowColor || '#1F2937';
    const highlightHex = params.highlightColor || '#F59E0B';

    const shadow = hexToRgb(shadowHex);
    const highlight = hexToRgb(highlightHex);

    const slopes = [
      (highlight.r - shadow.r) / 255,
      (highlight.g - shadow.g) / 255,
      (highlight.b - shadow.b) / 255,
    ];
    const intercepts = [shadow.r, shadow.g, shadow.b];

    const file = filesMeta[0];
    const extension = path.extname(file.originalName).replace('.', '').toLowerCase() || 'jpeg';
    const safeExtension = ['jpeg', 'jpg', 'png', 'webp', 'avif'].includes(extension) ? extension : 'jpeg';
    const outputName = `${requestId}-duotone.${safeExtension === 'jpg' ? 'jpg' : safeExtension}`;
    const outputPath = path.resolve(TMP_DIR, outputName);

    let pipeline = sharp(file.filePath)
      .toColourspace('b-w')
      .linear(slopes, intercepts);

    switch (safeExtension) {
      case 'png':
        pipeline = pipeline.png({ compressionLevel: 9 });
        break;
      case 'webp':
        pipeline = pipeline.webp({ quality: params.quality ? Number(params.quality) : 85 });
        break;
      case 'avif':
        pipeline = pipeline.avif({ quality: params.quality ? Number(params.quality) : 60 });
        break;
      default:
        pipeline = pipeline.jpeg({ quality: params.quality ? Number(params.quality) : 85 });
        break;
    }

    await pipeline.toFile(outputPath);

    const buffer = fs.readFileSync(outputPath);

    return {
      shadowColor: `#${shadowHex.replace('#', '').toUpperCase()}`,
      highlightColor: `#${highlightHex.replace('#', '').toUpperCase()}`,
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



