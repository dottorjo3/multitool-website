// 🔧 File: backend/tools/image-normalize.js
// 🔗 Normalizza histogramma immagine

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
    
    try {
      const outputName = `${requestId}-normalized.${path.extname(file.originalName).replace('.', '') || 'jpg'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      // Normalizza contrasto e luminosità
      await sharp(file.filePath)
        .normalize()
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
      throw new Error(`Errore durante la normalizzazione: ${error.message}`);
    }
  },
};


