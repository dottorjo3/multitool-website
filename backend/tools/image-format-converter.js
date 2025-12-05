// 🔧 File: backend/tools/image-format-converter.js
// 🔗 Convertitore formato avanzato con opzioni

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
    const format = params.format?.toLowerCase() || 'jpg';
    const quality = parseInt(params.quality, 10) || 90;
    
    const formatMap = {
      'jpg': 'jpeg',
      'jpeg': 'jpeg',
      'png': 'png',
      'webp': 'webp',
      'avif': 'avif',
      'tiff': 'tiff',
      'gif': 'gif',
    };
    
    const targetFormat = formatMap[format] || 'jpeg';
    
    try {
      const outputName = `${requestId}-converted.${format === 'jpg' ? 'jpg' : targetFormat}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      let pipeline = sharp(file.filePath);
      
      switch (targetFormat) {
        case 'jpeg':
          await pipeline.jpeg({ quality }).toFile(outputPath);
          break;
        case 'png':
          await pipeline.png({ compressionLevel: 9 }).toFile(outputPath);
          break;
        case 'webp':
          await pipeline.webp({ quality }).toFile(outputPath);
          break;
        case 'avif':
          await pipeline.avif({ quality }).toFile(outputPath);
          break;
        case 'tiff':
          await pipeline.tiff({ quality }).toFile(outputPath);
          break;
        case 'gif':
          await pipeline.gif().toFile(outputPath);
          break;
        default:
          await pipeline.jpeg({ quality }).toFile(outputPath);
      }
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        originalFormat: path.extname(file.originalName).replace('.', ''),
        targetFormat: format,
        originalSize: fs.statSync(file.filePath).size,
        outputSizeBytes: outputStats.size,
        compressionRatio: ((1 - outputStats.size / fs.statSync(file.filePath).size) * 100).toFixed(2) + '%',
        outputFile: {
          name: outputName,
          mimeType: `image/${targetFormat}`,
          base64: fs.readFileSync(outputPath).toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante la conversione: ${error.message}`);
    }
  },
};


