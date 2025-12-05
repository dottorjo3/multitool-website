// 🔧 File: backend/tools/audio-waveform.js
// 🔗 Genera waveform audio (immagine)

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
    const height = parseInt(params.height, 10) || 500;
    const color = params.color || '0000FF';
    
    try {
      const outputName = `${requestId}-waveform.png`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      const args = [
        '-i', file.filePath,
        '-filter_complex', `showwavespic=s=${width}x${height}:colors=0x${color}`,
        '-frames:v', '1',
        '-y',
        outputPath,
      ];
      
      await runFfmpeg(args);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        dimensions: `${width}x${height}`,
        color,
        outputSizeBytes: outputStats.size,
        outputFile: {
          name: outputName,
          mimeType: 'image/png',
          base64: fs.readFileSync(outputPath).toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante generazione waveform: ${error.message}`);
    }
  },
};


