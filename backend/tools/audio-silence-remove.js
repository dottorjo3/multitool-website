// 🔧 File: backend/tools/audio-silence-remove.js
// 🔗 Rimuove silenzi dall'audio

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
    const threshold = params.threshold || '-35dB'; // dB
    const duration = params.duration || '0.5'; // secondi
    
    try {
      const outputName = `${requestId}-no-silence.${path.extname(file.originalName).replace('.', '') || 'mp3'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      // Usa silenceremove filter
      const args = [
        '-i', file.filePath,
        '-af', `silenceremove=stop_periods=-1:stop_duration=${duration}:stop_threshold=${threshold}`,
        '-y',
        outputPath,
      ];
      
      await runFfmpeg(args);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        threshold,
        duration,
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
      throw new Error(`Errore durante rimozione silenzi: ${error.message}`);
    }
  },
};


