// 🔧 File: backend/tools/audio-pitch.js
// 🔗 Modifica pitch (tono)

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
    const semitones = parseFloat(params.semitones) || 0; // -12 a +12
    
    if (semitones < -12 || semitones > 12) {
      throw new Error('Semitoni deve essere tra -12 e +12');
    }

    try {
      const outputName = `${requestId}-pitch.${path.extname(file.originalName).replace('.', '') || 'mp3'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      // Calcola ratio per pitch shift
      const ratio = Math.pow(2, semitones / 12);
      
      const args = [
        '-i', file.filePath,
        '-filter:a', `asetrate=44100*${ratio},aresample=44100`,
        '-y',
        outputPath,
      ];
      
      await runFfmpeg(args);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        semitones,
        ratio: ratio.toFixed(4),
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
      throw new Error(`Errore durante modifica pitch: ${error.message}`);
    }
  },
};


