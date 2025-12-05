// 🔧 File: backend/tools/audio-normalize.js
// 🔗 Normalizza volume audio

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
    const method = params.method || 'peak'; // 'peak', 'rms', 'lufs'
    const targetLevel = params.targetLevel ? parseFloat(params.targetLevel) : -23; // dB
    
    try {
      const outputName = `${requestId}-normalized.${path.extname(file.originalName).replace('.', '') || 'mp3'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      let args = ['-i', file.filePath];
      
      if (method === 'lufs') {
        args.push('-af', `loudnorm=I=-23:TP=-1.5:LRA=11`);
      } else if (method === 'rms') {
        args.push('-af', `volume=${targetLevel}dB:replaygain=track`);
      } else {
        args.push('-af', `volume=${targetLevel}dB`);
      }
      
      args.push('-y', outputPath);
      
      await runFfmpeg(args);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        method,
        targetLevel,
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
      throw new Error(`Errore durante la normalizzazione: ${error.message}`);
    }
  },
};

