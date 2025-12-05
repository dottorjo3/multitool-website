// 🔧 File: backend/tools/video-speed.js
// 🔗 Modifica velocità video

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
    const speed = parseFloat(params.speed) || 1.0; // 0.5 = metà, 2.0 = doppio
    
    if (speed <= 0 || speed > 4) {
      throw new Error('Velocità deve essere tra 0.1 e 4.0');
    }

    try {
      const outputName = `${requestId}-speed.${path.extname(file.originalName).replace('.', '') || 'mp4'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      const args = [
        '-i', file.filePath,
        '-filter:v', `setpts=${1/speed}*PTS`,
        '-filter:a', `atempo=${speed}`,
        '-y',
        outputPath,
      ];
      
      await runFfmpeg(args);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        speed,
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
      throw new Error(`Errore durante modifica velocità: ${error.message}`);
    }
  },
};


