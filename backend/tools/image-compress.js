// 🔧 File: backend/tools/image-compress.js
// 🔗 Farm Ready — Compressione immagini con anteprima qualità

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { TMP_DIR } = require('../core/config');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un solo file immagine da comprimere');
    }

    const file = filesMeta[0];
    const quality = params.quality ? Number(params.quality) : 75;

    if (Number.isNaN(quality) || quality < 1 || quality > 100) {
      throw new Error('La qualità deve essere un numero compreso tra 1 e 100');
    }

    const format = params.format ? params.format.toLowerCase() : null;
    const supportedFormats = ['jpeg', 'jpg', 'png', 'webp', 'avif'];
    const targetFormat = format && supportedFormats.includes(format) ? format : 'jpeg';
    const safeExtension = targetFormat === 'jpg' ? 'jpeg' : targetFormat;
    const outputName = `${requestId}-compressed.${targetFormat === 'jpg' ? 'jpg' : targetFormat}`;
    const outputPath = path.resolve(TMP_DIR, outputName);

    const originalBuffer = fs.readFileSync(file.filePath);
    const pipeline = sharp(originalBuffer);

    switch (safeExtension) {
      case 'png':
        await pipeline.png({ compressionLevel: 9, quality }).toFile(outputPath);
        break;
      case 'webp':
        await pipeline.webp({ quality }).toFile(outputPath);
        break;
      case 'avif':
        await pipeline.avif({ quality }).toFile(outputPath);
        break;
      default:
        await pipeline.jpeg({ quality }).toFile(outputPath);
        break;
    }

    const compressedBuffer = fs.readFileSync(outputPath);

    return {
      quality,
      format: targetFormat,
      originalSizeBytes: originalBuffer.length,
      outputSizeBytes: compressedBuffer.length,
      compressionRatio: Number((compressedBuffer.length / originalBuffer.length).toFixed(2)),
      outputFile: {
        name: outputName,
        mimeType: `image/${safeExtension}`,
        base64: compressedBuffer.toString('base64'),
        tempPath: outputPath,
      },
    };
  },
};


