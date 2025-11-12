// 🔧 File: backend/tools/image-contrast.js
// 🔗 Regola il contrasto dell'immagine

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { TMP_DIR } = require('../core/config');

module.exports = {
  async run({ filesMeta, params, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica una sola immagine da modificare');
    }

    const contrast = params.contrast ? Number(params.contrast) : 1;
    if (Number.isNaN(contrast) || contrast < 0.1 || contrast > 3) {
      throw new Error('Il contrasto deve essere compreso tra 0.1 e 3');
    }

    const file = filesMeta[0];
    const extension = path.extname(file.originalName).replace('.', '').toLowerCase() || 'jpeg';
    const safeExtension = ['jpeg', 'jpg', 'png', 'webp', 'avif'].includes(extension) ? extension : 'jpeg';
    const outputName = `${requestId}-contrast.${safeExtension === 'jpg' ? 'jpg' : safeExtension}`;
    const outputPath = path.resolve(TMP_DIR, outputName);

    const intercept = 128 * (1 - contrast);
    let pipeline = sharp(file.filePath).linear(contrast, intercept);

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
      contrast,
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



