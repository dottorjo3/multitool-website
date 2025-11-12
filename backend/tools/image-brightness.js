// 🔧 File: backend/tools/image-brightness.js
// 🔗 Regola la luminosità di un'immagine

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { TMP_DIR } = require('../core/config');

module.exports = {
  async run({ filesMeta, params, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica una sola immagine da modificare');
    }

    const brightness = params.brightness ? Number(params.brightness) : 1;
    if (Number.isNaN(brightness) || brightness < 0.1 || brightness > 3) {
      throw new Error('La luminosità deve essere compresa tra 0.1 e 3');
    }

    const file = filesMeta[0];
    const extension = path.extname(file.originalName).replace('.', '').toLowerCase() || 'jpeg';
    const safeExtension = ['jpeg', 'jpg', 'png', 'webp', 'avif'].includes(extension) ? extension : 'jpeg';
    const outputName = `${requestId}-brightness.${safeExtension === 'jpg' ? 'jpg' : safeExtension}`;
    const outputPath = path.resolve(TMP_DIR, outputName);

    let pipeline = sharp(file.filePath).modulate({ brightness });

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
      brightness,
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



