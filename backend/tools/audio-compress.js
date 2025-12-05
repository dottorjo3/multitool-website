// 🔧 File: backend/tools/audio-compress.js
// 🔗 Comprimi audio riducendo bitrate

const path = require('path');
const fs = require('fs');
const { TMP_DIR } = require('../core/config');
const { runFfmpeg } = require('../core/ffmpeg');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un file audio');
    }

    const file = filesMeta[0];
    const bitrate = params.bitrate || '128';
    const quality = params.quality || '5'; // 0-9 per MP3
    
    try {
      const ext = path.extname(file.originalName).replace('.', '').toLowerCase() || 'mp3';
      const outputName = `${requestId}-compressed.${ext}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      let args = ['-i', file.filePath];
      
      if (ext === 'mp3') {
        args.push('-c:a', 'libmp3lame', '-b:a', `${bitrate}k`, '-q:a', quality);
      } else if (ext === 'aac' || ext === 'm4a') {
        args.push('-c:a', 'aac', '-b:a', `${bitrate}k`);
      } else if (ext === 'ogg') {
        args.push('-c:a', 'libvorbis', '-b:a', `${bitrate}k`);
      } else {
        args.push('-c:a', 'libmp3lame', '-b:a', `${bitrate}k`);
      }
      
      args.push('-y', outputPath);
      
      await runFfmpeg(args);
      
      const outputStats = fs.statSync(outputPath);
      const compressionRatio = ((1 - outputStats.size / fs.statSync(file.filePath).size) * 100).toFixed(2);
      
      return {
        originalSize: fs.statSync(file.filePath).size,
        outputSizeBytes: outputStats.size,
        bitrate: `${bitrate}k`,
        compressionRatio: `${compressionRatio}%`,
        outputFile: {
          name: outputName,
          mimeType: file.mimetype,
          base64: fs.readFileSync(outputPath).toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante la compressione: ${error.message}`);
    }
  },
};


