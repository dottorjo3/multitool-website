// 🔧 File: backend/tools/image-overlay-text.js
// 🔗 Aggiunge testo sovrapposto con opzioni di stile

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { TMP_DIR } = require('../core/config');

function hexToRgba(hex, alpha) {
  const sanitized = hex.replace('#', '');
  const bigint = parseInt(sanitized.length === 3
    ? sanitized.split('').map((c) => c + c).join('')
    : sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b, alpha };
}

module.exports = {
  async run({ filesMeta, params, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un’immagine su cui applicare il testo');
    }

    const text = params.text?.trim();
    if (!text) {
      throw new Error('Inserisci il testo da sovrapporre');
    }

    const position = params.position || 'center';
    const fontSize = params.fontSize ? Number(params.fontSize) : 48;
    const color = params.color || '#FFFFFF';
    const opacity = params.opacity ? Number(params.opacity) : 0.9;
    const padding = params.padding ? Number(params.padding) : 20;

    if (Number.isNaN(fontSize) || fontSize < 8 || fontSize > 200) {
      throw new Error('La dimensione del font deve essere tra 8 e 200');
    }

    const file = filesMeta[0];
    const extension = path.extname(file.originalName).replace('.', '').toLowerCase() || 'jpeg';
    const safeExtension = ['jpeg', 'jpg', 'png', 'webp', 'avif'].includes(extension) ? extension : 'jpeg';
    const outputName = `${requestId}-overlay-text.${safeExtension === 'jpg' ? 'jpg' : safeExtension}`;
    const outputPath = path.resolve(TMP_DIR, outputName);

    const image = sharp(file.filePath);
    const metadata = await image.metadata();

    const svgWidth = metadata.width || 800;
    const svgHeight = metadata.height || 600;

    const anchor = (() => {
      switch (position) {
        case 'top-left': return { anchor: 'start', x: padding, y: fontSize + padding };
        case 'top-right': return { anchor: 'end', x: svgWidth - padding, y: fontSize + padding };
        case 'bottom-left': return { anchor: 'start', x: padding, y: svgHeight - padding };
        case 'bottom-right': return { anchor: 'end', x: svgWidth - padding, y: svgHeight - padding };
        case 'center':
        default:
          return { anchor: 'middle', x: svgWidth / 2, y: svgHeight / 2 };
      }
    })();

    const { r, g, b, alpha } = hexToRgba(color, Math.min(Math.max(opacity, 0), 1));

    const svg = `
      <svg width="${svgWidth}" height="${svgHeight}">
        <style>
          .text { font-family: "Arial Black", Arial, sans-serif; font-size: ${fontSize}px; fill: rgba(${r}, ${g}, ${b}, ${alpha}); }
        </style>
        <text x="${anchor.x}" y="${anchor.y}" text-anchor="${anchor.anchor}" alignment-baseline="middle" class="text">${text.replace(/&/g, '&amp;')}</text>
      </svg>
    `;

    const pipeline = image.composite([{ input: Buffer.from(svg), gravity: 'center' }]);

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
      text,
      position,
      fontSize,
      color,
      opacity,
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


