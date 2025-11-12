// 🔧 File: backend/tools/image-resize.js
// 🔗 Farm Ready — Ridimensiona immagini con preset social e controllo fit

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { TMP_DIR } = require('../core/config');

const PRESETS = {
  'instagram-post': { width: 1080, height: 1080, fit: 'cover' },
  'instagram-story': { width: 1080, height: 1920, fit: 'cover' },
  'facebook-cover': { width: 1640, height: 624, fit: 'cover' },
  'linkedin-banner': { width: 1584, height: 396, fit: 'cover' },
  'youtube-thumbnail': { width: 1280, height: 720, fit: 'cover' },
};

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un solo file immagine da ridimensionare');
    }

    const file = filesMeta[0];
    const preset = params.preset && PRESETS[params.preset] ? PRESETS[params.preset] : null;

    const width = preset ? preset.width : params.width ? Number(params.width) : undefined;
    const height = preset ? preset.height : params.height ? Number(params.height) : undefined;
    const fit = preset ? preset.fit : params.fit || 'cover';

    if (!width && !height) {
      throw new Error('Specificare larghezza, altezza o selezionare un preset');
    }

    const parsedFit = ['cover', 'contain', 'inside', 'outside', 'fill'].includes(fit) ? fit : 'cover';
    const withoutEnlargement = params.withoutEnlargement !== 'false';
    const format = params.format ? params.format.toLowerCase() : null;

    const extension = format === 'jpg' ? 'jpeg' : format || path.extname(file.originalName).replace('.', '') || 'jpeg';
    const safeExtension = ['jpeg', 'jpg', 'png', 'webp', 'avif', 'tiff'].includes(extension) ? extension : 'jpeg';
    const outputName = `${requestId}-resize.${safeExtension === 'jpg' ? 'jpg' : safeExtension}`;
    const outputPath = path.resolve(TMP_DIR, outputName);

    const pipeline = sharp(file.filePath).resize({
      width,
      height,
      fit: parsedFit,
      withoutEnlargement,
    });

    let mimeType = `image/${safeExtension === 'jpg' ? 'jpeg' : safeExtension}`;

    switch (safeExtension) {
      case 'png':
        await pipeline.png({ compressionLevel: 9 }).toFile(outputPath);
        break;
      case 'webp':
        await pipeline.webp({ quality: params.quality ? Number(params.quality) : 85 }).toFile(outputPath);
        break;
      case 'avif':
        await pipeline.avif({ quality: params.quality ? Number(params.quality) : 50 }).toFile(outputPath);
        break;
      case 'tiff':
        await pipeline.tiff({ quality: params.quality ? Number(params.quality) : 80 }).toFile(outputPath);
        break;
      default:
        await pipeline.jpeg({ quality: params.quality ? Number(params.quality) : 85 }).toFile(outputPath);
        mimeType = 'image/jpeg';
        break;
    }

    const buffer = fs.readFileSync(outputPath);

    return {
      width,
      height,
      preset: params.preset || null,
      fit: parsedFit,
      withoutEnlargement,
      outputFile: {
        name: outputName,
        mimeType,
        base64: buffer.toString('base64'),
        tempPath: outputPath,
      },
      outputSizeBytes: buffer.length,
    };
  },
};


