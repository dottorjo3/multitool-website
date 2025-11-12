// 🔧 File: backend/tools/video-compress.js
// 🔗 Riduce dimensione video controllando bitrate e risoluzione

const path = require('path');
const fs = require('fs');
const { TMP_DIR } = require('../core/config');
const { runFfmpeg, runFfprobe } = require('../core/ffmpeg');

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
      throw new Error('Carica un singolo file video da comprimere');
    }

    const file = filesMeta[0];
    const targetWidth = params.width ? clamp(Number(params.width), 160, 3840, null) : null;
    const targetHeight = params.height ? clamp(Number(params.height), 90, 2160, null) : null;
    const videoBitrate = clamp(Number(params.videoBitrate) || 2500, 400, 15000, 2500);
    const crf = clamp(Number(params.crf) || 24, 18, 35, 24);
    const preset = ['ultrafast', 'superfast', 'veryfast', 'faster', 'fast', 'medium', 'slow', 'slower'].includes(params.preset)
      ? params.preset
      : 'medium';

    const baseName = path.parse(file.originalName).name || 'compressed';
    const extension = path.extname(file.originalName).replace('.', '') || 'mp4';
    const safeExtension = ['mp4', 'mkv', 'mov'].includes(extension.toLowerCase()) ? extension.toLowerCase() : 'mp4';
    const outputPath = path.resolve(TMP_DIR, `${requestId}-${baseName}.${safeExtension}`);

    const filterArgs = [];
    if (targetWidth || targetHeight) {
      filterArgs.push('-vf');
      if (targetWidth && targetHeight) {
        filterArgs.push(`scale=${targetWidth}:${targetHeight}:force_original_aspect_ratio=decrease`);
      } else if (targetWidth) {
        filterArgs.push(`scale=${targetWidth}:-2`);
      } else if (targetHeight) {
        filterArgs.push(`scale=-2:${targetHeight}`);
      }
    }

    const args = [
      '-y',
      '-i', file.filePath,
      '-c:v', 'libx264',
      '-preset', preset,
      '-crf', String(crf),
      '-b:v', `${videoBitrate}k`,
      '-maxrate', `${videoBitrate}k`,
      '-bufsize', `${videoBitrate * 2}k`,
      '-c:a', 'aac',
      '-b:a', `${clamp(Number(params.audioBitrate) || 128, 64, 512, 128)}k`,
      ...filterArgs,
      '-movflags', 'faststart',
      outputPath,
    ];

    await runFfmpeg(args);

    const buffer = await fs.promises.readFile(outputPath);
    const metadata = await probeMedia(outputPath).catch(() => null);

    return {
      targetWidth,
      targetHeight,
      videoBitrate,
      crf,
      preset,
      metadata,
      outputFile: {
        name: path.basename(outputPath),
        mimeType: `video/${safeExtension === 'mp4' ? 'mp4' : safeExtension}`,
        base64: buffer.toString('base64'),
        tempPath: outputPath,
      },
      outputSizeBytes: buffer.length,
    };
  },
};

