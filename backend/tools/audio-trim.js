// 🔧 File: backend/tools/audio-trim.js
// 🔗 Taglia audio (trim)

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
    const start = params.start || '00:00:00';
    const end = params.end || '';
    const duration = params.duration || '';
    
    if (!end && !duration) {
      throw new Error('Specifica end time o duration');
    }

    try {
      const outputName = `${requestId}-trimmed.${path.extname(file.originalName).replace('.', '') || 'mp3'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      let args = ['-i', file.filePath, '-ss', start];
      
      if (end) {
        args.push('-to', end);
      } else if (duration) {
        args.push('-t', duration);
      }
      
      args.push('-c', 'copy', '-y', outputPath);
      
      await runFfmpeg(args);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        start,
        end: end || `start + ${duration}`,
        originalSize: fs.statSync(file.filePath).size,
        outputSizeBytes: outputStats.size,
        outputFile: {
          name: outputName,
          mimeType: file.mimetype,
          base64: fs.readFileSync(outputPath).toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante il taglio: ${error.message}`);
    }
  },
};


