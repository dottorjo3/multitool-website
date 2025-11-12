// 🔧 File: backend/tools/video-metadata.js
// 🔗 Estrae metadati dettagliati da un video tramite FFprobe

const { runFfprobe } = require('../core/ffmpeg');

module.exports = {
  async run({ filesMeta }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un singolo file video per estrarre i metadati');
    }

    const file = filesMeta[0];

    const args = [
      '-v', 'quiet',
      '-print_format', 'json',
      '-show_format',
      '-show_streams',
      file.filePath,
    ];

    const { stdout } = await runFfprobe(args);

    const data = JSON.parse(stdout);

    const format = data.format || {};
    const streams = data.streams || [];

    const videoStream = streams.find((stream) => stream.codec_type === 'video');
    const audioStream = streams.find((stream) => stream.codec_type === 'audio');

    return {
      format: {
        filename: format.filename,
        durationSeconds: format.duration ? Number(format.duration) : null,
        sizeBytes: format.size ? Number(format.size) : null,
        bitRate: format.bit_rate ? Number(format.bit_rate) : null,
        formatLongName: format.format_long_name,
      },
      video: videoStream ? {
        codec: videoStream.codec_name,
        width: videoStream.width,
        height: videoStream.height,
        frameRate: videoStream.avg_frame_rate,
        bitRate: videoStream.bit_rate ? Number(videoStream.bit_rate) : null,
      } : null,
      audio: audioStream ? {
        codec: audioStream.codec_name,
        channels: audioStream.channels,
        sampleRate: audioStream.sample_rate ? Number(audioStream.sample_rate) : null,
        bitRate: audioStream.bit_rate ? Number(audioStream.bit_rate) : null,
      } : null,
      raw: data,
    };
  },
};


