// 🔧 File: backend/tools/audio-compressor.js
// 🔗 Applica compressione dinamica audio

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
    const ratio = parseFloat(params.ratio) || 4.0; // 2.0 - 20.0
    const threshold = parseFloat(params.threshold) || -12; // dB
    
    try {
      const outputName = `${requestId}-compressed.${path.extname(file.originalName).replace('.', '') || 'mp3'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      const args = [
        '-i', file.filePath,
        '-af', `acompressor=threshold=${threshold}dB:ratio=${ratio}:attack=5:release=50`,
        '-y',
        outputPath,
      ];
      
      await runFfmpeg(args);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        ratio,
        threshold,
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
      throw new Error(`Errore durante compressione: ${error.message}`);
    }
  },
};


