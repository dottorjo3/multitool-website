// 🔧 File: backend/tools/image-color-palette.js
// 🔗 Estrae la palette principale di un'immagine

const sharp = require('sharp');

function rgbToHex(r, g, b) {
  return `#${[r, g, b].map((value) => value.toString(16).padStart(2, '0')).join('').toUpperCase()}`;
}

module.exports = {
  async run({ params, filesMeta }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un singolo file immagine per estrarre la palette');
    }

    const file = filesMeta[0];
    const colorCount = params.count ? Number(params.count) : 5;
    const sampleSize = params.sampleSize ? Number(params.sampleSize) : 64;
    const ignoreTransparency = params.ignoreTransparency !== 'false';

    if (colorCount < 1 || colorCount > 16) {
      throw new Error('Il numero di colori deve essere tra 1 e 16');
    }

    const { data, info } = await sharp(file.filePath)
      .resize(sampleSize, sampleSize, { fit: 'inside' })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const colorMap = new Map();
    for (let i = 0; i < data.length; i += info.channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const alpha = info.channels === 4 ? data[i + 3] : 255;

      if (ignoreTransparency && alpha < 10) {
        continue;
      }

      const hex = rgbToHex(r, g, b);
      const current = colorMap.get(hex) || 0;
      colorMap.set(hex, current + 1);
    }

    const palette = Array.from(colorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, colorCount)
      .map(([hex, occurrences]) => ({
        hex,
        occurrences,
        percentage: Number(((occurrences / (info.width * info.height)) * 100).toFixed(2)),
      }));

    return {
      palette,
      totalColors: palette.length,
      sampleSize,
      ignoreTransparency,
    };
  },
};

