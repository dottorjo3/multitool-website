// 🔧 File: backend/tools/image-edge-detect.js
// 🔗 Rileva bordi nell'immagine

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
    const threshold = parseFloat(params.threshold) || 0.1;
    
    try {
      const outputName = `${requestId}-edges.png`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      // Edge detection usando sharpen e threshold
      await sharp(file.filePath)
        .greyscale()
        .sharpen({
          sigma: 2,
          flat: 1,
          jagged: 3,
        })
        .threshold(threshold * 255)
        .toFile(outputPath);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        originalSize: fs.statSync(file.filePath).size,
        outputSizeBytes: outputStats.size,
        threshold,
        outputFile: {
          name: outputName,
          mimeType: 'image/png',
          base64: fs.readFileSync(outputPath).toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante edge detection: ${error.message}`);
    }
  },
};


