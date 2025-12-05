// 🔧 File: backend/tools/image-hue-rotate.js
// 🔗 Ruota tonalità colore (hue)

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
    const hue = parseFloat(params.hue) || 0; // Gradi 0-360
    
    try {
      const outputName = `${requestId}-hue.${path.extname(file.originalName).replace('.', '') || 'jpg'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      // Sharp non ha diretto hue rotate, usiamo composite con overlay
      await sharp(file.filePath)
        .modulate({
          hue: hue / 360,
        })
        .toFile(outputPath);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        originalSize: fs.statSync(file.filePath).size,
        outputSizeBytes: outputStats.size,
        hue,
        outputFile: {
          name: outputName,
          mimeType: file.mimetype,
          base64: fs.readFileSync(outputPath).toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante la rotazione tonalità: ${error.message}`);
    }
  },
};


