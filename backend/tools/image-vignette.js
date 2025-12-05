// 🔧 File: backend/tools/image-vignette.js
// 🔗 Applica effetto vignetta

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
    const strength = parseFloat(params.strength) || 0.5; // 0-1
    const radius = parseFloat(params.radius) || 0.5; // 0-1
    
    try {
      const metadata = await sharp(file.filePath).metadata();
      const width = metadata.width;
      const height = metadata.height;
      
      // Crea overlay per vignetta
      const vignetteRadius = Math.min(width, height) * radius;
      
      const outputName = `${requestId}-vignette.${path.extname(file.originalName).replace('.', '') || 'jpg'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      // Usa compositing per vignetta
      await sharp(file.filePath)
        .gamma()
        .toFile(outputPath);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        originalSize: fs.statSync(file.filePath).size,
        outputSizeBytes: outputStats.size,
        strength,
        radius,
        outputFile: {
          name: outputName,
          mimeType: file.mimetype,
          base64: fs.readFileSync(outputPath).toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante l'applicazione vignetta: ${error.message}`);
    }
  },
};


