// 🔧 File: backend/tools/image-metadata.js
// 🔗 Farm Ready — Visualizza e pulisce metadata EXIF/ICC

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { TMP_DIR } = require('../core/config');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un solo file immagine');
    }

    const file = filesMeta[0];
    const image = sharp(file.filePath);
    const metadata = await image.metadata();

    const response = {
      originalName: file.originalName,
      metadata: {
        format: metadata.format,
        width: metadata.width,
        height: metadata.height,
        space: metadata.space,
        density: metadata.density,
        hasProfile: Boolean(metadata.icc),
        hasExif: Boolean(metadata.exif),
        orientation: metadata.orientation || null,
        sizeBytes: file.size,
      },
    };

    const shouldClean = params.clean === 'true' || params.clean === true;

    if (shouldClean) {
      const format = metadata.format || 'jpeg';
      const extension = format === 'jpeg' ? 'jpg' : format;
      const outputName = `${requestId}-clean.${extension}`;
      const outputPath = path.resolve(TMP_DIR, outputName);

      await sharp(file.filePath)
        .toFormat(format)
        .toFile(outputPath);

      const buffer = fs.readFileSync(outputPath);

      response.cleaned = {
        name: outputName,
        mimeType: `image/${format}`,
        base64: buffer.toString('base64'),
        tempPath: outputPath,
        outputSizeBytes: buffer.length,
        reductionRatio: Number((buffer.length / file.size).toFixed(2)),
      };
    }

    return response;
  },
};

