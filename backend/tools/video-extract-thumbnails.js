// 🔧 File: backend/tools/video-extract-thumbnails.js
// 🔗 Estrae multiple thumbnail da video

const path = require('path');
const fs = require('fs');
const archiver = require('archiver');
const { TMP_DIR } = require('../core/config');
const { runFfmpeg, runFfprobe } = require('../core/ffmpeg');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un video');
    }

    const file = filesMeta[0];
    const count = parseInt(params.count, 10) || 5;
    const width = parseInt(params.width, 10) || 320;
    
    try {
      const probeData = await runFfprobe(['-v', 'error', '-show_entries', 'format=duration', '-of', 'json', file.filePath]);
      const format = JSON.parse(probeData.stdout);
      const duration = parseFloat(format.format.duration) || 0;
      const interval = duration / (count + 1);
      
      const thumbnailFiles = [];
      
      for (let i = 1; i <= count; i++) {
        const timestamp = interval * i;
        const outputName = `${requestId}-thumb-${i}.jpg`;
        const outputPath = path.resolve(TMP_DIR, outputName);
        
        const args = [
          '-ss', timestamp.toString(),
          '-i', file.filePath,
          '-vf', `scale=${width}:-1`,
          '-vframes', '1',
          '-y',
          outputPath,
        ];
        
        await runFfmpeg(args);
        thumbnailFiles.push({ name: outputName, path: outputPath });
      }
      
      // Crea ZIP
      const zipPath = path.resolve(TMP_DIR, `${requestId}-thumbnails.zip`);
      const output = fs.createWriteStream(zipPath);
      const archive = archiver('zip', { zlib: { level: 9 } });
      
      return new Promise((resolve, reject) => {
        archive.pipe(output);
        thumbnailFiles.forEach(thumb => archive.file(thumb.path, { name: thumb.name }));
        archive.finalize();
        
        output.on('close', () => {
          resolve({
            thumbnailsCount: thumbnailFiles.length,
            width,
            outputFile: {
              name: `${requestId}-thumbnails.zip`,
              mimeType: 'application/zip',
              base64: fs.readFileSync(zipPath).toString('base64'),
              tempPath: zipPath,
            },
          });
        });
        archive.on('error', reject);
      });
    } catch (error) {
      throw new Error(`Errore durante estrazione thumbnail: ${error.message}`);
    }
  },
};


