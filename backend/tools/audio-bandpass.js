// 🔧 File: backend/tools/audio-bandpass.js
// 🔗 Applica filtro bandpass

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
    const centerFreq = parseFloat(params.centerFreq) || 1000; // Hz
    const bandwidth = parseFloat(params.bandwidth) || 500; // Hz
    
    try {
      const outputName = `${requestId}-bandpass.${path.extname(file.originalName).replace('.', '') || 'mp3'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      const args = [
        '-i', file.filePath,
        '-af', `bandpass=f=${centerFreq}:width_type=h:w=${bandwidth}`,
        '-y',
        outputPath,
      ];
      
      await runFfmpeg(args);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        centerFreq,
        bandwidth,
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
      throw new Error(`Errore durante applicazione bandpass: ${error.message}`);
    }
  },
};


