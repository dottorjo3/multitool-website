// 🔧 File: backend/tools/video-rotate.js
// 🔗 Ruota video

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
    const angle = parseInt(params.angle, 10) || 90; // 90, 180, 270
    
    if (![90, 180, 270].includes(angle)) {
      throw new Error('Angolo deve essere 90, 180 o 270');
    }

    try {
      const outputName = `${requestId}-rotated.${path.extname(file.originalName).replace('.', '') || 'mp4'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      const rotationMap = { 90: 'transpose=1', 180: 'transpose=1,transpose=1', 270: 'transpose=2' };
      
      const args = [
        '-i', file.filePath,
        '-vf', rotationMap[angle],
        '-c:a', 'copy',
        '-y',
        outputPath,
      ];
      
      await runFfmpeg(args);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        angle,
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
      throw new Error(`Errore durante rotazione: ${error.message}`);
    }
  },
};


