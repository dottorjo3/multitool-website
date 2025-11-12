// 🔧 File: backend/tools/video-convert.js
// 🔗 Converte file video in formati differenti usando FFmpeg

const path = require('path');
const fs = require('fs');
const { TMP_DIR } = require('../core/config');
const { runFfmpeg, runFfprobe } = require('../core/ffmpeg.js');

const OUTPUT_FORMATS = {
  mp4: {
    extension: 'mp4',
    videoCodec: ['-c:v', 'libx264'],
    audioCodec: ['-c:a', 'aac'],
    extra: ['-movflags', 'faststart'],
  },
  webm: {
    extension: 'webm',
    videoCodec: ['-c:v', 'libvpx-vp9'],
    audioCodec: ['-c:a', 'libopus'],
    extra: [],
  },
  mkv: {
    extension: 'mkv',
    videoCodec: ['-c:v', 'libx264'],
    audioCodec: ['-c:a', 'aac'],
    extra: [],
  },
  avi: {
    extension: 'avi',
    videoCodec: ['-c:v', 'libx264'],
    audioCodec: ['-c:a', 'aac'],
    extra: [],
  },
};

function clamp(value, min, max, fallback) {
  if (Number.isNaN(value)) return fallback;
  return Math.min(Math.max(value, min), max);
}

async function probeMedia(filePath) {
  const { stdout } = await runFfprobe([
    '-v', 'error',
    '-print_format', 'json',
    '-show_format',
    '-show_streams',
    filePath,
  ]);
  return JSON.parse(stdout);
}

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un singolo file video da convertire');
    }

    const file = filesMeta[0];
    const formatKey = (params.format || 'mp4').toLowerCase();
    const target = OUTPUT_FORMATS[formatKey];

    if (!target) {
      throw new Error(`Formato non supportato: ${params.format}`);
    }

    const crf = clamp(Number(params.crf) || 23, 18, 32, 23);
    const videoBitrate = clamp(Number(params.videoBitrate) || 3500, 500, 20000, 3500);
    const audioBitrate = clamp(Number(params.audioBitrate) || 192, 64, 512, 192);
    const preset = ['ultrafast', 'superfast', 'veryfast', 'faster', 'fast', 'medium', 'slow', 'slower'].includes(params.preset)
      ? params.preset
      : 'medium';

    const baseName = path.parse(file.originalName).name || 'video';
    const outputPath = path.resolve(TMP_DIR, `${requestId}-${baseName}.${target.extension}`);

    const args = [
      '-y',
      '-i', file.filePath,
      ...target.videoCodec,
      '-preset', preset,
      '-crf', String(crf),
      '-b:v', `${videoBitrate}k`,
      '-maxrate', `${videoBitrate}k`,
      '-bufsize', `${videoBitrate * 2}k`,
      ...target.audioCodec,
      '-b:a', `${audioBitrate}k`,
      ...target.extra,
      outputPath,
    ];

    await runFfmpeg(args);

    const buffer = await fs.promises.readFile(outputPath);
    const metadata = await probeMedia(outputPath).catch(() => null);

    return {
      format: target.extension,
      crf,
      preset,
      videoBitrate,
      audioBitrate,
      metadata,
      outputFile: {
        name: path.basename(outputPath),
        mimeType: `video/${target.extension === 'mp4' ? 'mp4' : target.extension}`,
        base64: buffer.toString('base64'),
        tempPath: outputPath,
      },
      outputSizeBytes: buffer.length,
    };
  },
};

