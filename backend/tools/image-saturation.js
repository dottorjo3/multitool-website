// 🔧 File: backend/tools/image-saturation.js
// 🔗 Modifica saturazione colore

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
    const saturation = parseFloat(params.saturation) || 1.0; // 0 = b&w, 1 = normale, >1 = più saturo
    
    try {
      const outputName = `${requestId}-saturation.${path.extname(file.originalName).replace('.', '') || 'jpg'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      await sharp(file.filePath)
        .modulate({
          saturation,
        })
        .toFile(outputPath);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        originalSize: fs.statSync(file.filePath).size,
        outputSizeBytes: outputStats.size,
        saturation,
        outputFile: {
          name: outputName,
          mimeType: file.mimetype,
          base64: fs.readFileSync(outputPath).toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante la modifica saturazione: ${error.message}`);
    }
  },
};


