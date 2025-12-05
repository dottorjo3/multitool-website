// 🔧 File: backend/tools/video-stabilize.js
// 🔗 Stabilizza video (anti-shake)

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
    
    try {
      const outputName = `${requestId}-stabilized.${path.extname(file.originalName).replace('.', '') || 'mp4'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      // Stabilizzazione base con deshake
      const args = [
        '-i', file.filePath,
        '-vf', 'deshake',
        '-c:a', 'copy',
        '-y',
        outputPath,
      ];
      
      await runFfmpeg(args);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        originalSize: fs.statSync(file.filePath).size,
        outputSizeBytes: outputStats.size,
        note: 'Stabilizzazione base applicata. Per risultati migliori usa vidstab plugin avanzato.',
        outputFile: {
          name: outputName,
          mimeType: file.mimetype,
          base64: fs.readFileSync(outputPath).toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante stabilizzazione: ${error.message}`);
    }
  },
};


