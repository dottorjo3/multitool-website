// 🔧 File: backend/tools/image-overlay-solid.js
// 🔗 Applica un overlay solido con trasparenza personalizzata

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { TMP_DIR } = require('../core/config');

function parseColor(color) {
  const sanitized = color.replace('#', '');
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
      throw new Error('Carica un’unica immagine');
    }

    const color = parseColor(params.color || '#1F2937');
    const opacity = params.opacity ? Number(params.opacity) : 0.5;
    if (Number.isNaN(opacity) || opacity < 0 || opacity > 1) {
      throw new Error('L’opacità deve essere compresa tra 0 e 1');
    }

    const file = filesMeta[0];
    const extension = path.extname(file.originalName).replace('.', '').toLowerCase() || 'jpeg';
    const safeExtension = ['jpeg', 'jpg', 'png', 'webp', 'avif'].includes(extension) ? extension : 'jpeg';
    const outputName = `${requestId}-overlay.${safeExtension === 'jpg' ? 'jpg' : safeExtension}`;
    const outputPath = path.resolve(TMP_DIR, outputName);

    const overlay = await sharp({
      create: {
        width: 1,
        height: 1,
        channels: 4,
        background: { ...color, alpha: opacity },
      },
    })
      .png()
      .toBuffer();

    const metadata = await sharp(file.filePath).metadata();
    const resizedOverlay = await sharp(overlay)
      .resize(metadata.width, metadata.height)
      .toBuffer();

    let pipeline = sharp(file.filePath).composite([{ input: resizedOverlay, blend: 'over' }]);

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
      color: params.color || '#1F2937',
      opacity,
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



