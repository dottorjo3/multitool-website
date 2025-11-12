// 🔧 File: backend/tools/video-thumbnail.js
// 🔗 Estrae un thumbnail da un video a un tempo specifico

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
      throw new Error('Carica un singolo file video per estrarre un thumbnail');
    }

    const file = filesMeta[0];
    const timestamp = params.timestamp || '00:00:01';
    const width = params.width ? clamp(Number(params.width), 16, 3840, 1280) : null;
    const format = params.format ? params.format.toLowerCase() : 'jpg';
    const safeFormat = ['jpg', 'jpeg', 'png', 'webp'].includes(format) ? format : 'jpg';

    const outputName = `${requestId}-thumbnail.${safeFormat === 'jpg' ? 'jpg' : safeFormat}`;
    const outputPath = path.resolve(TMP_DIR, outputName);

    const args = [
      '-y',
      '-ss', timestamp,
      '-i', file.filePath,
      '-frames:v', '1',
    ];

    if (width) {
      args.push('-vf', `scale=${width}:-1`);
    }

    args.push(outputPath);

    await runFfmpeg(args);

    const buffer = await fs.promises.readFile(outputPath);

    return {
      timestamp,
      width,
      format: safeFormat,
      outputFile: {
        name: path.basename(outputPath),
        mimeType: safeFormat === 'png' ? 'image/png' : safeFormat === 'webp' ? 'image/webp' : 'image/jpeg',
        base64: buffer.toString('base64'),
        tempPath: outputPath,
      },
      outputSizeBytes: buffer.length,
    };
  },
};



