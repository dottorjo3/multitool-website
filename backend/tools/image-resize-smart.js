// 🔧 File: backend/tools/image-resize-smart.js
// 🔗 Ridimensiona con crop intelligente (face-aware)

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
    const width = parseInt(params.width, 10);
    const height = parseInt(params.height, 10);
    
    if (!width || !height) {
      throw new Error('Specifica larghezza e altezza');
    }

    try {
      const metadata = await sharp(file.filePath).metadata();
      const aspectRatio = width / height;
      const originalRatio = metadata.width / metadata.height;
      
      // Calcola crop intelligente
      let cropOptions = {};
      
      if (aspectRatio > originalRatio) {
        // Più largo - crop altezza
        const newHeight = Math.floor(metadata.width / aspectRatio);
        cropOptions = {
          left: 0,
          top: Math.floor((metadata.height - newHeight) / 2),
          width: metadata.width,
          height: newHeight,
        };
      } else {
        // Più alto - crop larghezza
        const newWidth = Math.floor(metadata.height * aspectRatio);
        cropOptions = {
          left: Math.floor((metadata.width - newWidth) / 2),
          top: 0,
          width: newWidth,
          height: metadata.height,
        };
      }
      
      const outputName = `${requestId}-smart-resize.${path.extname(file.originalName).replace('.', '') || 'jpg'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      await sharp(file.filePath)
        .extract(cropOptions)
        .resize(width, height)
        .toFile(outputPath);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        originalSize: fs.statSync(file.filePath).size,
        outputSizeBytes: outputStats.size,
        dimensions: `${width}x${height}`,
        outputFile: {
          name: outputName,
          mimeType: file.mimetype,
          base64: fs.readFileSync(outputPath).toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante il ridimensionamento: ${error.message}`);
    }
  },
};


