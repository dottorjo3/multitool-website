// 🔧 File: backend/tools/audio-convert.js
// 🔗 Converte audio tra formati

const path = require('path');
const fs = require('fs');
const { TMP_DIR } = require('../core/config');
const { runFfmpeg } = require('../core/ffmpeg');

const AUDIO_FORMATS = {
  mp3: { codec: ['-c:a', 'libmp3lame'], extension: 'mp3', mime: 'audio/mpeg' },
  wav: { codec: ['-c:a', 'pcm_s16le'], extension: 'wav', mime: 'audio/wav' },
  ogg: { codec: ['-c:a', 'libvorbis'], extension: 'ogg', mime: 'audio/ogg' },
  aac: { codec: ['-c:a', 'aac'], extension: 'aac', mime: 'audio/aac' },
  flac: { codec: ['-c:a', 'flac'], extension: 'flac', mime: 'audio/flac' },
  m4a: { codec: ['-c:a', 'aac', '-b:a', '192k'], extension: 'm4a', mime: 'audio/mp4' },
};

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un file audio da convertire');
    }

    const file = filesMeta[0];
    const format = params.format?.toLowerCase() || 'mp3';
    const bitrate = params.bitrate || '192';
    
    if (!AUDIO_FORMATS[format]) {
      throw new Error(`Formato ${format} non supportato`);
    }

    try {
      const formatConfig = AUDIO_FORMATS[format];
      const outputName = `${requestId}-converted.${formatConfig.extension}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      const args = [
        '-i', file.filePath,
        ...formatConfig.codec,
        '-b:a', `${bitrate}k`,
        '-y',
        outputPath,
      ];
      
      await runFfmpeg(args);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        originalFormat: path.extname(file.originalName).replace('.', ''),
        targetFormat: format,
        originalSize: fs.statSync(file.filePath).size,
        outputSizeBytes: outputStats.size,
        outputFile: {
          name: outputName,
          mimeType: formatConfig.mime,
          base64: fs.readFileSync(outputPath).toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante la conversione: ${error.message}`);
    }
  },
};


