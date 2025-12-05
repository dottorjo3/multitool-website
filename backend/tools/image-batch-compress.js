// 🔧 File: backend/tools/image-batch-compress.js
// 🔗 Comprimi più immagini in batch

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const archiver = require('archiver');
const { TMP_DIR } = require('../core/config');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length === 0) {
      throw new Error('Carica almeno un\'immagine');
    }

    const quality = parseInt(params.quality, 10) || 80;
    
    try {
      const compressedFiles = [];
      
      for (const file of filesMeta) {
        const ext = path.extname(file.originalName).replace('.', '').toLowerCase() || 'jpg';
        const outputName = `${requestId}-${file.originalName.replace(/\.[^/.]+$/, '')}-compressed.${ext}`;
        const outputPath = path.resolve(TMP_DIR, outputName);
        
        let pipeline = sharp(file.filePath);
        
        if (ext === 'png') {
          await pipeline.png({ compressionLevel: 9 }).toFile(outputPath);
        } else if (ext === 'webp') {
          await pipeline.webp({ quality }).toFile(outputPath);
        } else {
          await pipeline.jpeg({ quality }).toFile(outputPath);
        }
        
        compressedFiles.push({
          originalName: file.originalName,
          originalSize: fs.statSync(file.filePath).size,
          compressedSize: fs.statSync(outputPath).size,
          path: outputPath,
          name: outputName,
        });
      }
      
      // Crea ZIP
      const zipPath = path.resolve(TMP_DIR, `${requestId}-compressed.zip`);
      const output = fs.createWriteStream(zipPath);
      const archive = archiver('zip', { zlib: { level: 9 } });
      
      return new Promise((resolve, reject) => {
        archive.pipe(output);
        
        compressedFiles.forEach(file => {
          archive.file(file.path, { name: file.name });
        });
        
        archive.finalize();
        
        output.on('close', () => {
          const totalOriginal = compressedFiles.reduce((sum, f) => sum + f.originalSize, 0);
          const totalCompressed = compressedFiles.reduce((sum, f) => sum + f.compressedSize, 0);
          
          resolve({
            filesCount: compressedFiles.length,
            totalOriginalSize: totalOriginal,
            totalCompressedSize: totalCompressed,
            compressionRatio: ((1 - totalCompressed / totalOriginal) * 100).toFixed(2) + '%',
            outputFile: {
              name: `${requestId}-compressed.zip`,
              mimeType: 'application/zip',
              base64: fs.readFileSync(zipPath).toString('base64'),
              tempPath: zipPath,
            },
          });
        });
        
        archive.on('error', reject);
      });
    } catch (error) {
      throw new Error(`Errore durante la compressione batch: ${error.message}`);
    }
  },
};


