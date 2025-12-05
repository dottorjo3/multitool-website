// 🔧 File: backend/tools/image-emboss.js
// 🔗 Applica effetto emboss (rilievo)

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
      const outputName = `${requestId}-emboss.${path.extname(file.originalName).replace('.', '') || 'jpg'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      // Emboss usando convoluzione (simplified)
      await sharp(file.filePath)
        .greyscale()
        .sharpen({
          sigma: 1 + strength,
          flat: 1,
          jagged: 2,
        })
        .toFile(outputPath);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        originalSize: fs.statSync(file.filePath).size,
        outputSizeBytes: outputStats.size,
        strength,
        outputFile: {
          name: outputName,
          mimeType: file.mimetype,
          base64: fs.readFileSync(outputPath).toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante emboss: ${error.message}`);
    }
  },
};


