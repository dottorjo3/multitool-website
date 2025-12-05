// 🔧 File: backend/tools/audio-merge.js
// 🔗 Unisce più file audio

const path = require('path');
const fs = require('fs');
const { TMP_DIR } = require('../core/config');
const { runFfmpeg } = require('../core/ffmpeg');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length < 2) {
      throw new Error('Carica almeno 2 file audio da unire');
    }

    try {
      // Crea file list per ffmpeg concat
      const listPath = path.resolve(TMP_DIR, `${requestId}-list.txt`);
      const listContent = filesMeta.map(f => `file '${f.filePath.replace(/'/g, "'\\''")}'`).join('\n');
      fs.writeFileSync(listPath, listContent);
      
      const outputName = `${requestId}-merged.${path.extname(filesMeta[0].originalName).replace('.', '') || 'mp3'}`;
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
      
      // Cleanup
      fs.unlinkSync(listPath);
      
      const outputStats = fs.statSync(outputPath);
      const totalOriginalSize = filesMeta.reduce((sum, f) => sum + fs.statSync(f.filePath).size, 0);
      
      return {
        filesCount: filesMeta.length,
        totalOriginalSize,
        outputSizeBytes: outputStats.size,
        outputFile: {
          name: outputName,
          mimeType: filesMeta[0].mimetype,
          base64: fs.readFileSync(outputPath).toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante l'unione: ${error.message}`);
    }
  },
};


