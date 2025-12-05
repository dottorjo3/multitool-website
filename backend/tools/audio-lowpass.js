// 🔧 File: backend/tools/audio-lowpass.js
// 🔗 Applica filtro lowpass

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
    const frequency = parseFloat(params.frequency) || 3000; // Hz
    
    try {
      const outputName = `${requestId}-lowpass.${path.extname(file.originalName).replace('.', '') || 'mp3'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      const args = [
        '-i', file.filePath,
        '-af', `lowpass=f=${frequency}`,
        '-y',
        outputPath,
      ];
      
      await runFfmpeg(args);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        frequency,
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
      throw new Error(`Errore durante applicazione lowpass: ${error.message}`);
    }
  },
};


