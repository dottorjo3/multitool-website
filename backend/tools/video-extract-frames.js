// 🔧 File: backend/tools/video-extract-frames.js
// 🔗 Estrae frame dal video

const path = require('path');
const fs = require('fs');
const archiver = require('archiver');
const { TMP_DIR } = require('../core/config');
const { runFfmpeg } = require('../core/ffmpeg');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un video');
    }

    const file = filesMeta[0];
    const fps = parseFloat(params.fps) || 1; // frame per secondo da estrarre
    const format = params.format || 'jpg'; // jpg, png
    
    try {
      const outputPattern = path.resolve(TMP_DIR, `${requestId}-frame-%03d.${format}`);
      
      const args = [
        '-i', file.filePath,
        '-vf', `fps=${fps}`,
        '-y',
        outputPattern,
      ];
      
      await runFfmpeg(args);
      
      // Trova tutti i frame estratti
      const frameFiles = fs.readdirSync(TMP_DIR)
        .filter(f => f.startsWith(`${requestId}-frame-`))
        .map(f => ({
          name: f,
          path: path.resolve(TMP_DIR, f),
        }));
      
      // Crea ZIP
      const zipPath = path.resolve(TMP_DIR, `${requestId}-frames.zip`);
      const output = fs.createWriteStream(zipPath);
      const archive = archiver('zip', { zlib: { level: 9 } });
      
      return new Promise((resolve, reject) => {
        archive.pipe(output);
        frameFiles.forEach(frame => archive.file(frame.path, { name: frame.name }));
        archive.finalize();
        
        output.on('close', () => {
          resolve({
            framesCount: frameFiles.length,
            fps,
            format,
            outputFile: {
              name: `${requestId}-frames.zip`,
              mimeType: 'application/zip',
              base64: fs.readFileSync(zipPath).toString('base64'),
              tempPath: zipPath,
            },
          });
        });
        archive.on('error', reject);
      });
    } catch (error) {
      throw new Error(`Errore durante estrazione frame: ${error.message}`);
    }
  },
};


