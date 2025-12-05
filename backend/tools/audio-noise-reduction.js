// 🔧 File: backend/tools/audio-noise-reduction.js
// 🔗 Riduce rumore audio

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
    const strength = parseFloat(params.strength) || 0.5; // 0-1
    
    try {
      const outputName = `${requestId}-denoised.${path.extname(file.originalName).replace('.', '') || 'mp3'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      // Usa highpass e lowpass per ridurre rumore (semplificato)
      const args = [
        '-i', file.filePath,
        '-af', `highpass=f=80,lowpass=f=12000`,
        '-y',
        outputPath,
      ];
      
      await runFfmpeg(args);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        strength,
        originalSize: fs.statSync(file.filePath).size,
        outputSizeBytes: outputStats.size,
        note: 'Riduzione rumore base applicata. Per risultati avanzati serve libreria specializzata.',
        outputFile: {
          name: outputName,
          mimeType: file.mimetype,
          base64: fs.readFileSync(outputPath).toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante riduzione rumore: ${error.message}`);
    }
  },
};


