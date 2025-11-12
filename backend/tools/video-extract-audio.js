// 🔧 File: backend/tools/video-extract-audio.js
// 🔗 Estrae traccia audio da un video in vari formati

const path = require('path');
const fs = require('fs');
const { TMP_DIR } = require('../core/config');
const { runFfmpeg } = require('../core/ffmpeg');

const AUDIO_FORMATS = {
  mp3: { codec: ['-c:a', 'libmp3lame'], extension: 'mp3', mime: 'audio/mpeg' },
  wav: { codec: ['-c:a', 'pcm_s16le'], extension: 'wav', mime: 'audio/wav' },
  aac: { codec: ['-c:a', 'aac'], extension: 'aac', mime: 'audio/aac' },
  flac: { codec: ['-c:a', 'flac'], extension: 'flac', mime: 'audio/flac' },
};

function clamp(value, min, max, fallback) {
  if (Number.isNaN(value)) return fallback;
  return Math.min(Math.max(value, min), max);
}

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un singolo file video da cui estrarre l\'audio');
    }

    const file = filesMeta[0];
    const formatKey = (params.format || 'mp3').toLowerCase();
    const target = AUDIO_FORMATS[formatKey];

    if (!target) {
      throw new Error(`Formato audio non supportato: ${params.format}`);
    }

    const audioBitrate = clamp(Number(params.audioBitrate) || 192, 64, 512, 192);
    const baseName = path.parse(file.originalName).name || 'audio';
    const outputPath = path.resolve(TMP_DIR, `${requestId}-${baseName}.${target.extension}`);

    const args = [
      '-y',
      '-i', file.filePath,
      '-vn',
      ...target.codec,
      '-b:a', `${audioBitrate}k`,
      outputPath,
    ];

    await runFfmpeg(args);

    const buffer = await fs.promises.readFile(outputPath);

    return {
      format: target.extension,
      audioBitrate,
      outputFile: {
        name: path.basename(outputPath),
        mimeType: target.mime,
        base64: buffer.toString('base64'),
        tempPath: outputPath,
      },
      outputSizeBytes: buffer.length,
    };
  },
};

