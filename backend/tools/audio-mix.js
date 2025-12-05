// 🔧 File: backend/tools/audio-mix.js
// 🔗 Mixa più tracce audio insieme

const path = require('path');
const fs = require('fs');
const { TMP_DIR } = require('../core/config');
const { runFfmpeg } = require('../core/ffmpeg');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length < 2) {
      throw new Error('Carica almeno 2 file audio da mixare');
    }

    try {
      const outputName = `${requestId}-mixed.${path.extname(filesMeta[0].originalName).replace('.', '') || 'mp3'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      // Crea input complesso per mix
      const inputs = filesMeta.map(f => ['-i', f.filePath]).flat();
      const filterComplex = filesMeta.map((_, i) => `[${i}:a]`).join('') + `amix=inputs=${filesMeta.length}:duration=longest`;
      
      const args = [
        ...inputs,
        '-filter_complex', filterComplex,
        '-y',
        outputPath,
      ];
      
      await runFfmpeg(args);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        tracksCount: filesMeta.length,
        originalSize: filesMeta.reduce((sum, f) => sum + fs.statSync(f.filePath).size, 0),
        outputSizeBytes: outputStats.size,
        outputFile: {
          name: outputName,
          mimeType: filesMeta[0].mimetype,
          base64: fs.readFileSync(outputPath).toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante mix: ${error.message}`);
    }
  },
};


