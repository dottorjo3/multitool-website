// 🔧 File: backend/tools/image-sepia.js
// 🔗 Applica un effetto seppia personalizzabile

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { TMP_DIR } = require('../core/config');

module.exports = {
  async run({ filesMeta, params, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica una singola immagine su cui applicare l’effetto seppia');
    }

    const intensity = params.intensity ? Number(params.intensity) : 0.8;
    if (Number.isNaN(intensity) || intensity < 0 || intensity > 1) {
      throw new Error('L’intensità deve essere compresa tra 0 e 1');
    }

    const file = filesMeta[0];
    const extension = path.extname(file.originalName).replace('.', '').toLowerCase() || 'jpeg';
    const safeExtension = ['jpeg', 'jpg', 'png', 'webp', 'avif'].includes(extension) ? extension : 'jpeg';
    const outputName = `${requestId}-sepia.${safeExtension === 'jpg' ? 'jpg' : safeExtension}`;
    const outputPath = path.resolve(TMP_DIR, outputName);

    const sepiaMatrix = [
      [0.393 + 0.607 * (1 - intensity), 0.769 - 0.769 * (1 - intensity), 0.189 - 0.189 * (1 - intensity)],
      [0.349 - 0.349 * (1 - intensity), 0.686 + 0.314 * (1 - intensity), 0.168 - 0.168 * (1 - intensity)],
      [0.272 - 0.272 * (1 - intensity), 0.534 - 0.534 * (1 - intensity), 0.131 + 0.869 * (1 - intensity)],
    ];

    const pipeline = sharp(file.filePath)
      .linear(1, 0)
      .recomb(sepiaMatrix);

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
      effect: 'sepia',
      intensity,
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


