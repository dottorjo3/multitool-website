// 🔧 File: backend/tools/image-crop.js
// 🔗 Ritaglia una porzione dell'immagine

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { TMP_DIR } = require('../core/config');

module.exports = {
  async run({ filesMeta, params, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica una singola immagine da ritagliare');
    }

    const left = params.left ? Number(params.left) : 0;
    const top = params.top ? Number(params.top) : 0;
    const width = params.width ? Number(params.width) : null;
    const height = params.height ? Number(params.height) : null;

    if ([left, top].some((value) => Number.isNaN(value) || value < 0)) {
      throw new Error('I valori di top e left devono essere numeri positivi');
    }

    if ([width, height].some((value) => value === null || Number.isNaN(value) || value <= 0)) {
      throw new Error('Specificare una larghezza e altezza valide per il crop');
    }

    const file = filesMeta[0];
    const image = sharp(file.filePath);
    const metadata = await image.metadata();

    if (left + width > metadata.width || top + height > metadata.height) {
      throw new Error('L’area di ritaglio supera le dimensioni dell’immagine');
    }

    const extension = path.extname(file.originalName).replace('.', '').toLowerCase() || 'jpeg';
    const safeExtension = ['jpeg', 'jpg', 'png', 'webp', 'avif'].includes(extension) ? extension : 'jpeg';
    const outputName = `${requestId}-crop.${safeExtension === 'jpg' ? 'jpg' : safeExtension}`;
    const outputPath = path.resolve(TMP_DIR, outputName);

    const pipeline = image.extract({ left, top, width, height });

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
      area: { left, top, width, height },
      originalSize: { width: metadata.width, height: metadata.height },
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



