// 🔧 File: backend/tools/image-shadow.js
// 🔗 Aggiunge un'ombra morbida dietro l'immagine

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { TMP_DIR } = require('../core/config');

function parseShadowColor(color) {
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
      throw new Error('Carica una singola immagine');
    }

    const offsetX = params.offsetX ? Number(params.offsetX) : 20;
    const offsetY = params.offsetY ? Number(params.offsetY) : 20;
    const blur = params.blur ? Number(params.blur) : 30;
    const spread = params.spread ? Number(params.spread) : 40;
    const color = parseShadowColor(params.color || '#000000');
    const alpha = params.opacity ? Number(params.opacity) : 0.35;

    const file = filesMeta[0];
    const image = sharp(file.filePath).ensureAlpha();
    const metadata = await image.metadata();

    const shadowWidth = metadata.width + spread;
    const shadowHeight = metadata.height + spread;

    const shadow = await sharp({
      create: {
        width: shadowWidth,
        height: shadowHeight,
        channels: 4,
        background: { ...color, alpha },
      },
    })
      .blur(blur)
      .png()
      .toBuffer();

    const canvasWidth = shadowWidth + Math.max(offsetX, 0);
    const canvasHeight = shadowHeight + Math.max(offsetY, 0);

    const canvas = sharp({
      create: {
        width: canvasWidth,
        height: canvasHeight,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .png();

    const composed = await canvas
      .composite([
        { input: shadow, left: Math.max(offsetX, 0), top: Math.max(offsetY, 0) },
        { input: await image.png().toBuffer(), left: spread / 2, top: spread / 2 },
      ])
      .png()
      .toBuffer();

    const extension = path.extname(file.originalName).replace('.', '').toLowerCase() || 'png';
    const safeExtension = ['png', 'webp', 'avif'].includes(extension) ? extension : 'png';
    const outputName = `${requestId}-shadow.${safeExtension}`;
    const outputPath = path.resolve(TMP_DIR, outputName);

    let pipeline = sharp(composed);

    switch (safeExtension) {
      case 'webp':
        pipeline = pipeline.webp({ quality: params.quality ? Number(params.quality) : 85 });
        break;
      case 'avif':
        pipeline = pipeline.avif({ quality: params.quality ? Number(params.quality) : 60 });
        break;
      default:
        pipeline = pipeline.png({ compressionLevel: 9 });
        break;
    }

    await pipeline.toFile(outputPath);

    const buffer = fs.readFileSync(outputPath);

    return {
      offsetX,
      offsetY,
      blur,
      spread,
      color: params.color || '#000000',
      opacity: alpha,
      outputFile: {
        name: outputName,
        mimeType: `image/${safeExtension}`,
        base64: buffer.toString('base64'),
        tempPath: outputPath,
      },
      outputSizeBytes: buffer.length,
    };
  },
};



