// 🔧 File: backend/tools/image-sharpen.js
// 🔗 Aumenta la nitidezza di un'immagine con controllo parametri

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { TMP_DIR } = require('../core/config');

module.exports = {
  async run({ filesMeta, params, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica una singola immagine da affinare');
    }

    const sigma = params.sigma ? Number(params.sigma) : 1;
    const flat = params.flat ? Number(params.flat) : 1;
    const jagged = params.jagged ? Number(params.jagged) : 2;

    if (Number.isNaN(sigma) || sigma < 0 || sigma > 10) {
      throw new Error('Sigma deve essere tra 0 e 10');
    }
    if (Number.isNaN(flat) || flat < 0 || flat > 10) {
      throw new Error('Flat deve essere tra 0 e 10');
    }
    if (Number.isNaN(jagged) || jagged < 0 || jagged > 10) {
      throw new Error('Jagged deve essere tra 0 e 10');
    }

    const file = filesMeta[0];
    const extension = path.extname(file.originalName).replace('.', '').toLowerCase() || 'jpeg';
    const safeExtension = ['jpeg', 'jpg', 'png', 'webp', 'avif'].includes(extension) ? extension : 'jpeg';
    const outputName = `${requestId}-sharpen.${safeExtension === 'jpg' ? 'jpg' : safeExtension}`;
    const outputPath = path.resolve(TMP_DIR, outputName);

    const pipeline = sharp(file.filePath).sharpen(sigma, flat, jagged);

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
        await pipeline.jpeg({ quality: 85 }).toFile(outputPath);
        break;
    }

    const buffer = fs.readFileSync(outputPath);

    return {
      params: { sigma, flat, jagged },
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



