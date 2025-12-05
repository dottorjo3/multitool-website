// 🔧 File: backend/tools/video-crop.js
// 🔗 Ritaglia video

const path = require('path');
const fs = require('fs');
const { TMP_DIR } = require('../core/config');
const { runFfmpeg } = require('../core/ffmpeg');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un video');
    }

    const file = filesMeta[0];
    const x = parseInt(params.x, 10) || 0;
    const y = parseInt(params.y, 10) || 0;
    const width = parseInt(params.width, 10);
    const height = parseInt(params.height, 10);
    
    if (!width || !height) {
      throw new Error('Specifica larghezza e altezza del ritaglio');
    }

    try {
      const outputName = `${requestId}-cropped.${path.extname(file.originalName).replace('.', '') || 'mp4'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      const args = [
        '-i', file.filePath,
        '-vf', `crop=${width}:${height}:${x}:${y}`,
        '-c:a', 'copy',
        '-y',
        outputPath,
      ];
      
      await runFfmpeg(args);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        crop: `${width}x${height}@${x},${y}`,
        originalSize: fs.statSync(file.filePath).size,
        outputSizeBytes: outputStats.size,
        outputFile: {
          name: outputName,
          mimeType: file.mimetype,
          base64: fs.readFileSync(outputPath).toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante ritaglio: ${error.message}`);
    }
  },
};


