// 🔧 File: backend/tools/image-mirror.js
// 🔗 Specchia immagine orizzontalmente o verticalmente

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
    const direction = params.direction || 'horizontal'; // 'horizontal', 'vertical', 'both'
    
    try {
      const outputName = `${requestId}-mirror.${path.extname(file.originalName).replace('.', '') || 'jpg'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      let pipeline = sharp(file.filePath);
      
      if (direction === 'horizontal') {
        pipeline = pipeline.flop();
      } else if (direction === 'vertical') {
        pipeline = pipeline.flip();
      } else if (direction === 'both') {
        pipeline = pipeline.flop().flip();
      }
      
      await pipeline.toFile(outputPath);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        originalSize: fs.statSync(file.filePath).size,
        outputSizeBytes: outputStats.size,
        direction,
        outputFile: {
          name: outputName,
          mimeType: file.mimetype,
          base64: fs.readFileSync(outputPath).toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante lo specchiamento: ${error.message}`);
    }
  },
};


