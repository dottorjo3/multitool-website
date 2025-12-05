// 🔧 File: backend/tools/video-concatenate.js
// 🔗 Concatena video (alternativa a merge)

const path = require('path');
const fs = require('fs');
const { TMP_DIR } = require('../core/config');
const { runFfmpeg } = require('../core/ffmpeg');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length < 2) {
      throw new Error('Carica almeno 2 video');
    }

    try {
      // Crea file list
      const listPath = path.resolve(TMP_DIR, `${requestId}-list.txt`);
      const listContent = filesMeta.map(f => `file '${f.filePath.replace(/'/g, "'\\''")}'`).join('\n');
      fs.writeFileSync(listPath, listContent);
      
      const outputName = `${requestId}-concatenated.${path.extname(filesMeta[0].originalName).replace('.', '') || 'mp4'}`;
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
        filesCount: filesMeta.length,
        outputSizeBytes: outputStats.size,
        outputFile: {
          name: outputName,
          mimeType: filesMeta[0].mimetype,
          base64: fs.readFileSync(outputPath).toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante concatenazione: ${error.message}`);
    }
  },
};


