// 🔧 File: backend/tools/image-white-balance.js
// 🔗 Corregge bilanciamento bianco

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
      const outputName = `${requestId}-whitebalance.${path.extname(file.originalName).replace('.', '') || 'jpg'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      // Auto white balance usando normalize
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
      throw new Error(`Errore durante white balance: ${error.message}`);
    }
  },
};


