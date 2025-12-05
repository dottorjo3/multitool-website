// 🔧 File: backend/tools/image-aspect-ratio.js
// 🔗 Cambia aspect ratio con padding o crop

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
    const ratio = params.ratio || '16:9'; // '16:9', '4:3', '1:1', '9:16'
    const method = params.method || 'crop'; // 'crop', 'pad'
    const backgroundColor = params.backgroundColor || '#FFFFFF';
    
    try {
      const [w, h] = ratio.split(':').map(n => parseInt(n, 10));
      const targetRatio = w / h;
      
      const metadata = await sharp(file.filePath).metadata();
      const originalRatio = metadata.width / metadata.height;
      
      const outputName = `${requestId}-aspect.${path.extname(file.originalName).replace('.', '') || 'jpg'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      if (method === 'crop') {
        // Crop per raggiungere ratio
        let cropOptions = {};
        if (targetRatio > originalRatio) {
          const newHeight = Math.floor(metadata.width / targetRatio);
          cropOptions = {
            left: 0,
            top: Math.floor((metadata.height - newHeight) / 2),
            width: metadata.width,
            height: newHeight,
          };
        } else {
          const newWidth = Math.floor(metadata.height * targetRatio);
          cropOptions = {
            left: Math.floor((metadata.width - newWidth) / 2),
            top: 0,
            width: newWidth,
            height: metadata.height,
          };
        }
        
        await sharp(file.filePath)
          .extract(cropOptions)
          .toFile(outputPath);
      } else {
        // Pad per raggiungere ratio
        let newWidth = metadata.width;
        let newHeight = metadata.height;
        
        if (targetRatio > originalRatio) {
          newWidth = Math.floor(metadata.height * targetRatio);
        } else {
          newHeight = Math.floor(metadata.width / targetRatio);
        }
        
        await sharp(file.filePath)
          .resize(newWidth, newHeight, {
            fit: 'contain',
            background: backgroundColor,
          })
          .toFile(outputPath);
      }
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        originalSize: fs.statSync(file.filePath).size,
        outputSizeBytes: outputStats.size,
        ratio,
        method,
        outputFile: {
          name: outputName,
          mimeType: file.mimetype,
          base64: fs.readFileSync(outputPath).toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante cambio aspect ratio: ${error.message}`);
    }
  },
};


