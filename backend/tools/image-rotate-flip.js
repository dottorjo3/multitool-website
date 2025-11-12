// 🔧 File: backend/tools/image-rotate-flip.js
// 🔗 Ruota e ribalta immagini con opzioni multiple

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { TMP_DIR } = require('../core/config');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un solo file immagine da ruotare o ribaltare');
    }

    const file = filesMeta[0];
    const rotation = params.rotation ? Number(params.rotation) : 0;
    const flipHorizontal = params.flipHorizontal === 'true';
    const flipVertical = params.flipVertical === 'true';
    const formatRaw = params.format ? params.format.toLowerCase() : null;

    const allowedFormats = ['jpeg', 'jpg', 'png', 'webp', 'avif'];
    const format = allowedFormats.includes(formatRaw) ? formatRaw : null;

    const baseName = path.parse(file.originalName).name || 'image';
    const extension = format || path.extname(file.originalName).replace('.', '') || 'jpeg';
    const safeExtension = allowedFormats.includes(extension) ? extension : 'jpeg';
    const outputPath = path.resolve(TMP_DIR, `${requestId}-${baseName}.${safeExtension === 'jpg' ? 'jpg' : safeExtension}`);

    let pipeline = sharp(file.filePath);

    if (rotation) {
      pipeline = pipeline.rotate(rotation);
    }

    if (flipHorizontal) {
      pipeline = pipeline.flip();
    }

    if (flipVertical) {
      pipeline = pipeline.flop();
    }

    switch (safeExtension) {
      case 'png':
        await pipeline.png({ compressionLevel: 9 }).toFile(outputPath);
        break;
      case 'webp':
        await pipeline.webp({ quality: params.quality ? Number(params.quality) : 90 }).toFile(outputPath);
        break;
      case 'avif':
        await pipeline.avif({ quality: params.quality ? Number(params.quality) : 70 }).toFile(outputPath);
        break;
      default:
        await pipeline.jpeg({ quality: params.quality ? Number(params.quality) : 90 }).toFile(outputPath);
    }

    const buffer = await fs.promises.readFile(outputPath);

    return {
      rotation,
      flipHorizontal,
      flipVertical,
      format: safeExtension,
      outputFile: {
        name: path.basename(outputPath),
        mimeType: `image/${safeExtension === 'jpg' ? 'jpeg' : safeExtension}`,
        base64: buffer.toString('base64'),
        tempPath: outputPath,
      },
      outputSizeBytes: buffer.length,
    };
  },
};

