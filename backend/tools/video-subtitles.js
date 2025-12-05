// 🔧 File: backend/tools/video-subtitles.js
// 🔗 Aggiunge sottotitoli al video

const path = require('path');
const fs = require('fs');
const { TMP_DIR } = require('../core/config');
const { runFfmpeg } = require('../core/ffmpeg');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length < 1) {
      throw new Error('Carica un video e file sottotitoli');
    }

    const videoFile = filesMeta.find(f => f.mimetype?.startsWith('video/')) || filesMeta[0];
    const subtitleFile = filesMeta.find(f => 
      f.mimetype === 'text/vtt' || 
      f.mimetype === 'text/srt' ||
      f.originalName.endsWith('.srt') ||
      f.originalName.endsWith('.vtt')
    );
    
    if (!subtitleFile) {
      throw new Error('Carica file sottotitoli (.srt o .vtt)');
    }

    try {
      const outputName = `${requestId}-subtitled.${path.extname(videoFile.originalName).replace('.', '') || 'mp4'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      const args = [
        '-i', videoFile.filePath,
        '-vf', `subtitles=${subtitleFile.filePath}`,
        '-c:a', 'copy',
        '-y',
        outputPath,
      ];
      
      await runFfmpeg(args);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        originalSize: fs.statSync(videoFile.filePath).size,
        outputSizeBytes: outputStats.size,
        outputFile: {
          name: outputName,
          mimeType: videoFile.mimetype,
          base64: fs.readFileSync(outputPath).toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante aggiunta sottotitoli: ${error.message}`);
    }
  },
};


