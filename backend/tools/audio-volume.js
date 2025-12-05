// 🔧 File: backend/tools/audio-volume.js
// 🔗 Modifica volume audio

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
    const volume = parseFloat(params.volume) || 1.0; // 0.0 - 2.0 (1.0 = normale)
    
    if (volume < 0 || volume > 2) {
      throw new Error('Volume deve essere tra 0.0 e 2.0');
    }

    try {
      const outputName = `${requestId}-volume.${path.extname(file.originalName).replace('.', '') || 'mp3'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      const args = [
        '-i', file.filePath,
        '-af', `volume=${volume}`,
        '-y',
        outputPath,
      ];
      
      await runFfmpeg(args);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        volume,
        volumePercent: (volume * 100).toFixed(0) + '%',
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
      throw new Error(`Errore durante modifica volume: ${error.message}`);
    }
  },
};


