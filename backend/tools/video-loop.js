// 🔧 File: backend/tools/video-loop.js
// 🔗 Crea loop video (ripete N volte)

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
    const times = parseInt(params.times, 10) || 2;
    
    if (times < 2 || times > 10) {
      throw new Error('Ripetizioni deve essere tra 2 e 10');
    }

    try {
      // Crea file list con video ripetuto
      const listPath = path.resolve(TMP_DIR, `${requestId}-list.txt`);
      const listContent = Array(times).fill(`file '${file.filePath.replace(/'/g, "'\\''")}'`).join('\n');
      fs.writeFileSync(listPath, listContent);
      
      const outputName = `${requestId}-looped.${path.extname(file.originalName).replace('.', '') || 'mp4'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      const args = [
        '-f', 'concat',
        '-safe', '0',
        '-i', listPath,
        '-c', 'copy',
        '-y',
        outputPath,
      ];
      
      await runFfmpeg(args);
      
      fs.unlinkSync(listPath);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        times,
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
      throw new Error(`Errore durante creazione loop: ${error.message}`);
    }
  },
};


