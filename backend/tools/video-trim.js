// 🔧 File: backend/tools/video-trim.js
// 🔗 Taglia clip video specificando start/durata

const path = require('path');
const fs = require('fs');
const { TMP_DIR } = require('../core/config');
const { runFfmpeg, runFfprobe } = require('../core/ffmpeg');

function normalizeTime(value) {
  if (!value) return null;
  const trimmed = String(value).trim();
  if (/^\d+(\.\d+)?$/.test(trimmed)) {
    return trimmed;
  }
  if (/^\d{1,2}:\d{2}:\d{2}(\.\d+)?$/.test(trimmed) || /^\d{1,2}:\d{2}(\.\d+)?$/.test(trimmed)) {
    return trimmed;
  }
  throw new Error('Formato tempo non valido. Usa secondi (es. 12.5) o HH:MM:SS');
}

async function probeMedia(filePath) {
  const { stdout } = await runFfprobe([
    '-v', 'error',
    '-print_format', 'json',
    '-show_format',
    filePath,
  ]);
  return JSON.parse(stdout);
}

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un singolo file video da tagliare');
    }

    const file = filesMeta[0];
    const start = normalizeTime(params.start);
    const duration = normalizeTime(params.duration);

    if (!start && !duration) {
      throw new Error('Specifica almeno un punto di inizio o una durata');
    }

    const extension = path.extname(file.originalName).replace('.', '') || 'mp4';
    const baseName = path.parse(file.originalName).name || 'clip';
    const outputPath = path.resolve(TMP_DIR, `${requestId}-${baseName}.${extension}`);

    const args = ['-y'];
    if (start) {
      args.push('-ss', start);
    }

    args.push('-i', file.filePath);

    if (duration) {
      args.push('-t', duration);
    }

    args.push('-c', 'copy', outputPath);

    await runFfmpeg(args);

    const buffer = await fs.promises.readFile(outputPath);
    const metadata = await probeMedia(outputPath).catch(() => null);

    return {
      start,
      duration,
      metadata,
      outputFile: {
        name: path.basename(outputPath),
        mimeType: `video/${extension}`,
        base64: buffer.toString('base64'),
        tempPath: outputPath,
      },
      outputSizeBytes: buffer.length,
    };
  },
};

