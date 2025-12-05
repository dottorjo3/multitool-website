// 🔧 File: backend/tools/image-collage.js
// 🔗 Crea collage da più immagini

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { TMP_DIR } = require('../core/config');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length < 2) {
      throw new Error('Carica almeno 2 immagini per creare un collage');
    }

    const layout = params.layout || 'grid'; // 'grid', 'horizontal', 'vertical'
    const columns = parseInt(params.columns, 10) || 2;
    
    try {
      const images = [];
      
      // Carica tutte le immagini
      for (const file of filesMeta) {
        const metadata = await sharp(file.filePath).metadata();
        const buffer = await sharp(file.filePath).resize(300, 300, { fit: 'inside' }).toBuffer();
        images.push({
          buffer,
          width: metadata.width,
          height: metadata.height,
        });
      }
      
      // Crea collage
      const tileWidth = 300;
      const tileHeight = 300;
      const cols = layout === 'horizontal' ? images.length : columns;
      const rows = Math.ceil(images.length / cols);
      
      const collageWidth = cols * tileWidth;
      const collageHeight = rows * tileHeight;
      
      const collage = sharp({
        create: {
          width: collageWidth,
          height: collageHeight,
          channels: 4,
          background: { r: 255, g: 255, b: 255, alpha: 1 },
        },
      });
      
      const composites = [];
      images.forEach((img, idx) => {
        const x = (idx % cols) * tileWidth;
        const y = Math.floor(idx / cols) * tileHeight;
        composites.push({
          input: img.buffer,
          top: y,
          left: x,
        });
      });
      
      const outputName = `${requestId}-collage.png`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      await collage.composite(composites).png().toFile(outputPath);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        imagesCount: images.length,
        layout,
        dimensions: `${collageWidth}x${collageHeight}`,
        outputSizeBytes: outputStats.size,
        outputFile: {
          name: outputName,
          mimeType: 'image/png',
          base64: fs.readFileSync(outputPath).toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante la creazione collage: ${error.message}`);
    }
  },
};


