// 🔧 File: backend/tools/image-convert.js
// 🔗 Farm Ready — Conversione formato immagine con supporto batch

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { TMP_DIR } = require('../core/config');

const ALLOWED_FORMATS = ['jpeg', 'jpg', 'png', 'webp', 'avif', 'tiff'];

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length === 0) {
      throw new Error('Carica almeno un file immagine da convertire');
    }

    const targetFormat = params.format ? params.format.toLowerCase() : null;
    if (!targetFormat || !ALLOWED_FORMATS.includes(targetFormat)) {
      throw new Error(`Formato di destinazione non supportato. Formati disponibili: ${ALLOWED_FORMATS.join(', ')}`);
    }

    const quality = params.quality ? Number(params.quality) : undefined;
    if (quality && (quality < 1 || quality > 100)) {
      throw new Error('La qualità deve essere compresa tra 1 e 100');
    }

    const results = [];

    for (const file of filesMeta) {
      const basename = path.parse(file.originalName).name;
      const safeExtension = targetFormat === 'jpg' ? 'jpeg' : targetFormat;
      const outputName = `${basename}-${requestId}.${targetFormat === 'jpg' ? 'jpg' : targetFormat}`;
      const outputPath = path.resolve(TMP_DIR, outputName);

      const pipeline = sharp(file.filePath);

      switch (safeExtension) {
        case 'png':
          await pipeline.png({ compressionLevel: 9 }).toFile(outputPath);
          break;
        case 'webp':
          await pipeline.webp({ quality: quality || 85 }).toFile(outputPath);
          break;
        case 'avif':
          await pipeline.avif({ quality: quality || 50 }).toFile(outputPath);
          break;
        case 'tiff':
          await pipeline.tiff({ quality: quality || 80 }).toFile(outputPath);
          break;
        default:
          await pipeline.jpeg({ quality: quality || 85 }).toFile(outputPath);
          break;
      }

      const buffer = fs.readFileSync(outputPath);

      results.push({
        originalName: file.originalName,
        outputFile: {
          name: outputName,
          mimeType: `image/${safeExtension === 'jpg' ? 'jpeg' : safeExtension}`,
          base64: buffer.toString('base64'),
          tempPath: outputPath,
        },
        outputSizeBytes: buffer.length,
      });
    }

    return {
      format: targetFormat,
      quality: quality || null,
      files: results,
    };
  },
};


