// 🔧 File: backend/tools/audio-spectrogram.js
// 🔗 Genera spettrogramma audio

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
    const width = parseInt(params.width, 10) || 1920;
    const height = parseInt(params.height, 10) || 1080;
    
    try {
      const outputName = `${requestId}-spectrogram.png`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      const args = [
        '-i', file.filePath,
        '-lavfi', `showspectrumpic=s=${width}x${height}`,
        '-frames:v', '1',
        '-y',
        outputPath,
      ];
      
      await runFfmpeg(args);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        dimensions: `${width}x${height}`,
        outputSizeBytes: outputStats.size,
        outputFile: {
          name: outputName,
          mimeType: 'image/png',
          base64: fs.readFileSync(outputPath).toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante generazione spettrogramma: ${error.message}`);
    }
  },
};


