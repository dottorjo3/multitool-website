// 🔧 File: backend/tools/image-background-remover.js
// 🔗 Rimuove lo sfondo impostando trasparenza sui colori simili

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { TMP_DIR } = require('../core/config');

function parseHexColor(hex) {
  const value = hex.replace('#', '').trim();
  if (value.length === 3) {
    const r = parseInt(value[0] + value[0], 16);
    const g = parseInt(value[1] + value[1], 16);
    const b = parseInt(value[2] + value[2], 16);
    return { r, g, b };
  }
  if (value.length === 6) {
    const r = parseInt(value.substring(0, 2), 16);
    const g = parseInt(value.substring(2, 4), 16);
    const b = parseInt(value.substring(4, 6), 16);
    return { r, g, b };
  }
  throw new Error('Colore sfondo non valido, usa formato esadecimale');
}

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un singolo file immagine per rimuovere lo sfondo');
    }

    const file = filesMeta[0];
    const tolerance = params.tolerance ? Number(params.tolerance) : 35;
    const backgroundColor = parseHexColor(params.backgroundColor || '#FFFFFF');

    const image = sharp(file.filePath);
    const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      if (
        Math.abs(r - backgroundColor.r) <= tolerance &&
        Math.abs(g - backgroundColor.g) <= tolerance &&
        Math.abs(b - backgroundColor.b) <= tolerance
      ) {
        data[i + 3] = 0; // alpha trasparente
      }
    }

    const outputPath = path.resolve(TMP_DIR, `${requestId}-background-removed.png`);
    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: info.channels,
      },
    })
      .png()
      .toFile(outputPath);

    const buffer = await fs.promises.readFile(outputPath);

    return {
      tolerance,
      backgroundColor: params.backgroundColor || '#FFFFFF',
      outputFile: {
        name: path.basename(outputPath),
        mimeType: 'image/png',
        base64: buffer.toString('base64'),
        tempPath: outputPath,
      },
      outputSizeBytes: buffer.length,
    };
  },
};

