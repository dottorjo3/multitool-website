// 🔧 File: backend/tools/video-to-gif.js
// 🔗 Converte un video in una GIF animata

const path = require('path');
const fs = require('fs');
const { TMP_DIR } = require('../core/config');
const { runFfmpeg } = require('../core/ffmpeg');

function clamp(value, min, max, fallback) {
  if (Number.isNaN(value)) return fallback;
  return Math.min(Math.max(value, min), max);
}

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un singolo file video da convertire in GIF');
    }

    const file = filesMeta[0];
    const fps = clamp(Number(params.fps) || 12, 1, 30, 12);
    const width = params.width ? clamp(Number(params.width), 16, 1920, 720) : null;
    const startTime = params.start ? params.start.trim() : null;
    const duration = params.duration ? params.duration.trim() : null;

    const baseName = path.parse(file.originalName).name || 'animation';
    const outputPath = path.resolve(TMP_DIR, `${requestId}-${baseName}.gif`);

    const filterParts = [`fps=${fps}`];
    if (width) {
      filterParts.push(`scale=${width}:-1:flags=lanczos`);
    } else {
      filterParts.push('scale=iw:-1:flags=lanczos');
    }
    filterParts.push('split [a][b]; [a] palettegen [p]; [b][p] paletteuse');

    const args = ['-y', '-i', file.filePath];

    if (startTime) {
      args.unshift('-ss', startTime);
    }
    if (duration) {
      args.push('-t', duration);
    }

    args.push(
      '-filter_complex', filterParts.join(', '),
      '-loop', '0',
      outputPath,
    );

    await runFfmpeg(args);

    const buffer = await fs.promises.readFile(outputPath);

    return {
      fps,
      width,
      startTime,
      duration,
      outputFile: {
        name: path.basename(outputPath),
        mimeType: 'image/gif',
        base64: buffer.toString('base64'),
        tempPath: outputPath,
      },
      outputSizeBytes: buffer.length,
    };
  },
};

