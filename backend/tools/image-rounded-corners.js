// 🔧 File: backend/tools/image-rounded-corners.js
// 🔗 Applica angoli arrotondati a un'immagine

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { TMP_DIR } = require('../core/config');

module.exports = {
  async run({ filesMeta, params, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica una singola immagine su cui applicare gli angoli arrotondati');
    }

    const radius = params.radius ? Number(params.radius) : 32;
    if (Number.isNaN(radius) || radius < 1 || radius > 2000) {
      throw new Error('Il raggio deve essere compreso tra 1 e 2000 pixel');
    }

    const file = filesMeta[0];
    const image = sharp(file.filePath);
    const metadata = await image.metadata();

    const roundedMask = Buffer.from(`
      <svg width="${metadata.width}" height="${metadata.height}">
        <rect x="0" y="0" width="${metadata.width}" height="${metadata.height}" rx="${radius}" ry="${radius}" />
      </svg>
    `);

    const extension = path.extname(file.originalName).replace('.', '').toLowerCase() || 'png';
    const safeExtension = ['png', 'webp', 'avif'].includes(extension) ? extension : 'png';
    const outputName = `${requestId}-rounded.${safeExtension}`;
    const outputPath = path.resolve(TMP_DIR, outputName);

    const pipeline = image
      .composite([{ input: roundedMask, blend: 'dest-in' }]);

    switch (safeExtension) {
      case 'webp':
        await pipeline.webp({ quality: 90 }).toFile(outputPath);
        break;
      case 'avif':
        await pipeline.avif({ quality: 70 }).toFile(outputPath);
        break;
      default:
        await pipeline.png({ compressionLevel: 9 }).toFile(outputPath);
        break;
    }

    const buffer = fs.readFileSync(outputPath);

    return {
      radius,
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


