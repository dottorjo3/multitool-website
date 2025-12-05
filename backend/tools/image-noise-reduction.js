// 🔧 File: backend/tools/image-noise-reduction.js
// 🔗 Riduce rumore dalle immagini

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { TMP_DIR } = require('../core/config');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un solo file immagine');
    }

    const file = filesMeta[0];
    const strength = parseFloat(params.strength) || 0.5;
    
    try {
      const outputName = `${requestId}-denoised.${path.extname(file.originalName).replace('.', '') || 'jpg'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      await sharp(file.filePath)
        .sharpen({
          sigma: 2 - strength * 2,
          flat: 1,
          jagged: 1,
        })
        .median(Math.max(1, Math.floor(strength * 5)))
        .toFile(outputPath);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
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
      throw new Error(`Errore durante la riduzione rumore: ${error.message}`);
    }
  },
};


