// 🔧 File: backend/tools/audio-equalizer.js
// 🔗 Applica equalizzatore audio

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
    const preset = params.preset || 'flat'; // 'flat', 'bass', 'treble', 'vocal'
    
    try {
      const outputName = `${requestId}-equalized.${path.extname(file.originalName).replace('.', '') || 'mp3'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      let filter = '';
      switch (preset) {
        case 'bass':
          filter = 'equalizer=f=60:width_type=o:width=2:g=5';
          break;
        case 'treble':
          filter = 'equalizer=f=10000:width_type=o:width=2:g=5';
          break;
        case 'vocal':
          filter = 'equalizer=f=3000:width_type=o:width=2:g=3';
          break;
        default:
          filter = 'volume=1.0';
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
        preset,
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
      throw new Error(`Errore durante equalizzazione: ${error.message}`);
    }
  },
};


