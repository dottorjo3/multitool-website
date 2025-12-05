// 🔧 File: backend/tools/image-blur-background.js
// 🔗 Sfoca lo sfondo mantenendo il soggetto

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
    const blur = parseFloat(params.blur) || 10;
    
    try {
      const outputName = `${requestId}-blur-bg.${path.extname(file.originalName).replace('.', '') || 'jpg'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      // Crea versione sfocata
      const blurred = await sharp(file.filePath)
        .blur(blur)
        .toBuffer();
      
      // Per ora applica blur globale (rimozione background richiede ML)
      await sharp(file.filePath)
        .blur(blur)
        .toFile(outputPath);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        originalSize: fs.statSync(file.filePath).size,
        outputSizeBytes: outputStats.size,
        blur,
        note: 'Blur globale applicato. Rimozione background selettiva richiede ML.',
        outputFile: {
          name: outputName,
          mimeType: file.mimetype,
          base64: fs.readFileSync(outputPath).toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante blur background: ${error.message}`);
    }
  },
};


