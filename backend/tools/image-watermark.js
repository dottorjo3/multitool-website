// 🔧 File: backend/tools/image-watermark.js
// 🔗 Farm Ready — Applica watermark testuale con controllo posizione/opacità

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { TMP_DIR } = require('../core/config');

const POSITIONS = {
  center: { x: '50%', y: '50%', anchor: 'middle', baseline: 'middle' },
  'top-left': { x: '10%', y: '15%', anchor: 'start', baseline: 'hanging' },
  'top-right': { x: '90%', y: '15%', anchor: 'end', baseline: 'hanging' },
  'bottom-left': { x: '10%', y: '90%', anchor: 'start', baseline: 'baseline' },
  'bottom-right': { x: '90%', y: '90%', anchor: 'end', baseline: 'baseline' },
};

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un solo file immagine su cui applicare il watermark');
    }

    const file = filesMeta[0];
    const text = params.text?.trim();
    if (!text) {
      throw new Error('Inserisci il testo del watermark');
    }

    const color = params.color || '#FFFFFF';
    const opacity = Math.min(Math.max(Number(params.opacity || 0.35), 0.05), 1);
    const fontSize = Math.min(Math.max(Number(params.fontSize || 64), 12), 300);
    const angle = Number(params.angle || -35);
    const position = POSITIONS[params.position] ? params.position : 'center';

    const transformer = sharp(file.filePath);
    const metadata = await transformer.metadata();
    const width = metadata.width || 1200;
    const height = metadata.height || 800;

    const coords = POSITIONS[position];

    const svg = `
      <svg width="${width}" height="${height}">
        <style>
          .watermark {
            font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
            font-size: ${fontSize}px;
            font-weight: 600;
            fill: ${color};
            fill-opacity: ${opacity};
          }
        </style>
        <text
          x="${coords.x}"
          y="${coords.y}"
          text-anchor="${coords.anchor}"
          dominant-baseline="${coords.baseline}"
          class="watermark"
          transform="rotate(${angle}, ${width / 2}, ${height / 2})"
        >
          ${text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}
        </text>
      </svg>
    `;

    const format = metadata.format || 'jpeg';
    const extension = format === 'jpeg' ? 'jpg' : format;
    const outputName = `${requestId}-watermark.${extension}`;
    const outputPath = path.resolve(TMP_DIR, outputName);

    await sharp(file.filePath)
      .composite([{ input: Buffer.from(svg), gravity: 'center' }])
      .toFormat(format)
      .toFile(outputPath);

    const buffer = fs.readFileSync(outputPath);

    return {
      text,
      position,
      opacity,
      fontSize,
      angle,
      outputFile: {
        name: outputName,
        mimeType: `image/${format}`,
        base64: buffer.toString('base64'),
        tempPath: outputPath,
      },
      outputSizeBytes: buffer.length,
    };
  },
};


