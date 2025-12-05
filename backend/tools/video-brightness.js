// 🔧 File: backend/tools/video-brightness.js
// 🔗 Modifica luminosità video

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
    const brightness = parseFloat(params.brightness) || 0; // -1.0 a 1.0
    const contrast = parseFloat(params.contrast) || 1.0; // 0.0 a 2.0
    
    try {
      const outputName = `${requestId}-adjusted.${path.extname(file.originalName).replace('.', '') || 'mp4'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      const args = [
        '-i', file.filePath,
        '-vf', `eq=brightness=${brightness}:contrast=${contrast}`,
        '-c:a', 'copy',
        '-y',
        outputPath,
      ];
      
      await runFfmpeg(args);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        brightness,
        contrast,
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
      throw new Error(`Errore durante modifica luminosità: ${error.message}`);
    }
  },
};


