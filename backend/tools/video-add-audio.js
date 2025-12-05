// 🔧 File: backend/tools/video-add-audio.js
// 🔗 Aggiunge traccia audio a video

const path = require('path');
const fs = require('fs');
const { TMP_DIR } = require('../core/config');
const { runFfmpeg } = require('../core/ffmpeg');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length < 2) {
      throw new Error('Carica un video e almeno un file audio');
    }

    const videoFile = filesMeta.find(f => f.mimetype?.startsWith('video/')) || filesMeta[0];
    const audioFile = filesMeta.find(f => f.mimetype?.startsWith('audio/')) || filesMeta[1];
    
    try {
      const outputName = `${requestId}-with-audio.${path.extname(videoFile.originalName).replace('.', '') || 'mp4'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      const replaceAudio = params.replaceAudio === 'true';
      
      const args = [
        '-i', videoFile.filePath,
        '-i', audioFile.filePath,
        '-c:v', 'copy',
        '-c:a', 'aac',
        replaceAudio ? '-map', '0:v:0', '-map', '1:a:0' : '-map', '0:v:0', '-map', '0:a:0', '-map', '1:a:0',
        '-shortest',
        '-y',
        outputPath,
      ];
      
      await runFfmpeg(args);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        originalSize: fs.statSync(videoFile.filePath).size,
        outputSizeBytes: outputStats.size,
        replaceAudio,
        outputFile: {
          name: outputName,
          mimeType: videoFile.mimetype,
          base64: fs.readFileSync(outputPath).toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante aggiunta audio: ${error.message}`);
    }
  },
};


