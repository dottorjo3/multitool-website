// 🔧 File: backend/tools/audio-reverb.js
// 🔗 Applica effetto reverb

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
    const roomSize = parseFloat(params.roomSize) || 0.5; // 0-1
    const damping = parseFloat(params.damping) || 0.5; // 0-1
    
    try {
      const outputName = `${requestId}-reverb.${path.extname(file.originalName).replace('.', '') || 'mp3'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      // Usa aecho come reverb semplificato
      const args = [
        '-i', file.filePath,
        '-af', `aecho=0.8:0.9:1000:0.3`,
        '-y',
        outputPath,
      ];
      
      await runFfmpeg(args);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        roomSize,
        damping,
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
      throw new Error(`Errore durante applicazione reverb: ${error.message}`);
    }
  },
};


