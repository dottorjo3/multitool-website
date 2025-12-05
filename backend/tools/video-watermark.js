// 🔧 File: backend/tools/video-watermark.js
// 🔗 Aggiunge watermark (immagine o testo) al video

const path = require('path');
const fs = require('fs');
const { TMP_DIR } = require('../core/config');
const { runFfmpeg } = require('../core/ffmpeg');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length < 1) {
      throw new Error('Carica un video');
    }

    const file = filesMeta[0];
    const watermarkType = params.type || 'text'; // 'text' o 'image'
    const text = params.text || '';
    const position = params.position || 'bottom-right'; // top-left, top-right, bottom-left, bottom-right, center
    
    try {
      const outputName = `${requestId}-watermarked.${path.extname(file.originalName).replace('.', '') || 'mp4'}`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      let filter = '';
      
      if (watermarkType === 'text' && text) {
        const posMap = {
          'top-left': 'x=10:y=10',
          'top-right': 'x=w-tw-10:y=10',
          'bottom-left': 'x=10:y=h-th-10',
          'bottom-right': 'x=w-tw-10:y=h-th-10',
          'center': 'x=(w-tw)/2:y=(h-th)/2',
        };
        
        filter = `drawtext=text='${text}':fontcolor=white:fontsize=24:${posMap[position]}:box=1:boxcolor=black@0.5`;
      } else if (watermarkType === 'image' && filesMeta.length >= 2) {
        const imageFile = filesMeta[1];
        const posMap = {
          'top-left': '10:10',
          'top-right': 'W-w-10:10',
          'bottom-left': '10:H-h-10',
          'bottom-right': 'W-w-10:H-h-10',
          'center': '(W-w)/2:(H-h)/2',
        };
        
        filter = `movie=${imageFile.filePath}[wm];[in][wm]overlay=${posMap[position]}[out]`;
      } else {
        throw new Error('Specifica testo o carica immagine watermark');
      }
      
      const args = [
        '-i', file.filePath,
        ...(watermarkType === 'image' ? ['-i', filesMeta[1].filePath] : []),
        '-vf', filter,
        '-c:a', 'copy',
        '-y',
        outputPath,
      ];
      
      await runFfmpeg(args);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        watermarkType,
        position,
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
      throw new Error(`Errore durante aggiunta watermark: ${error.message}`);
    }
  },
};


