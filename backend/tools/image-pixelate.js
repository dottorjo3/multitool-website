// 🔧 File: backend/tools/image-pixelate.js
// 🔗 Effetto pixel art con blocchi configurabili

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { TMP_DIR } = require('../core/config');

module.exports = {
  async run({ filesMeta, params, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un’unica immagine da pixelare');
    }

    const blockSize = params.blockSize ? Number(params.blockSize) : 16;
    if (Number.isNaN(blockSize) || blockSize < 2 || blockSize > 200) {
      throw new Error('La dimensione dei blocchi deve essere tra 2 e 200');
    }

    const file = filesMeta[0];
    const extension = path.extname(file.originalName).replace('.', '').toLowerCase() || 'jpeg';
    const safeExtension = ['jpeg', 'jpg', 'png', 'webp', 'avif'].includes(extension) ? extension : 'jpeg';
    const outputName = `${requestId}-pixelate.${safeExtension === 'jpg' ? 'jpg' : safeExtension}`;
    const outputPath = path.resolve(TMP_DIR, outputName);

    const image = sharp(file.filePath);
    const metadata = await image.metadata();

    const downWidth = Math.max(1, Math.round((metadata.width || 0) / blockSize));
    const downHeight = Math.max(1, Math.round((metadata.height || 0) / blockSize));

    const pipeline = image
      .resize(downWidth, downHeight, { kernel: sharp.kernel.nearest })
      .resize(metadata.width, metadata.height, { kernel: sharp.kernel.nearest });

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
      blockSize,
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



