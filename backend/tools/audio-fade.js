// 🔧 File: backend/tools/audio-fade.js
// 🔗 Applica fade in/out

const path = require('path');
const fs = require('fs');
const { TMP_DIR } = require('../core/config');
const { runFfmpeg } = require('../core/ffmpeg');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un file audio');
    }

    const file = filesMeta[0];
    const fadeIn = parseFloat(params.fadeIn) || 0; // secondi
    const fadeOut = parseFloat(params.fadeOut) || 0; // secondi
    
    if (fadeIn === 0 && fadeOut === 0) {
      throw new Error('Specifica almeno fade in o fade out');
    }

    try {
      const outputName = `${requestId}-fade.${path.extname(file.originalName).replace('.', '') || 'mp3'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      // Ottieni durata
      const { parseFile } = require('music-metadata');
      const metadata = await parseFile(file.filePath);
      const duration = metadata.format.duration || 0;
      
      let filter = '';
      if (fadeIn > 0 && fadeOut > 0) {
        filter = `afade=t=in:st=0:d=${fadeIn},afade=t=out:st=${duration - fadeOut}:d=${fadeOut}`;
      } else if (fadeIn > 0) {
        filter = `afade=t=in:st=0:d=${fadeIn}`;
      } else {
        filter = `afade=t=out:st=${duration - fadeOut}:d=${fadeOut}`;
      }
      
      const args = [
        '-i', file.filePath,
        '-af', filter,
        '-y',
        outputPath,
      ];
      
      await runFfmpeg(args);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        fadeIn,
        fadeOut,
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
      throw new Error(`Errore durante fade: ${error.message}`);
    }
  },
};


