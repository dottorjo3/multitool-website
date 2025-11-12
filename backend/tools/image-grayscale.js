// 🔧 File: backend/tools/image-grayscale.js
// 🔗 Converte l'immagine in scala di grigi

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { TMP_DIR } = require('../core/config');

module.exports = {
  async run({ filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica una singola immagine da convertire');
    }

    const file = filesMeta[0];
    const extension = path.extname(file.originalName).replace('.', '').toLowerCase() || 'jpeg';
    const safeExtension = ['jpeg', 'jpg', 'png', 'webp', 'avif'].includes(extension) ? extension : 'jpeg';
    const outputName = `${requestId}-grayscale.${safeExtension === 'jpg' ? 'jpg' : safeExtension}`;
    const outputPath = path.resolve(TMP_DIR, outputName);

    const pipeline = sharp(file.filePath).grayscale();

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
      effect: 'grayscale',
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



