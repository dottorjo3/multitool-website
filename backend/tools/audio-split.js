// 🔧 File: backend/tools/audio-split.js
// 🔗 Divide audio in segmenti

const path = require('path');
const fs = require('fs');
const archiver = require('archiver');
const { TMP_DIR } = require('../core/config');
const { runFfmpeg } = require('../core/ffmpeg');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un file audio');
    }

    const file = filesMeta[0];
    const segmentDuration = parseInt(params.segmentDuration, 10) || 60; // secondi
    
    try {
      // Ottieni durata totale
      const { parseFile } = require('music-metadata');
      const metadata = await parseFile(file.filePath);
      const totalDuration = metadata.format.duration || 0;
      const segments = Math.ceil(totalDuration / segmentDuration);
      
      const segmentFiles = [];
      
      for (let i = 0; i < segments; i++) {
        const start = i * segmentDuration;
        const outputName = `${requestId}-segment-${i + 1}.${path.extname(file.originalName).replace('.', '') || 'mp3'}`;
        const outputPath = path.resolve(TMP_DIR, outputName);
        
        const args = [
          '-i', file.filePath,
          '-ss', start.toString(),
          '-t', segmentDuration.toString(),
          '-c', 'copy',
          '-y',
          outputPath,
        ];
        
        await runFfmpeg(args);
        segmentFiles.push({
          name: outputName,
          path: outputPath,
          segment: i + 1,
        });
      }
      
      // Crea ZIP
      const zipPath = path.resolve(TMP_DIR, `${requestId}-segments.zip`);
      const output = fs.createWriteStream(zipPath);
      const archive = archiver('zip', { zlib: { level: 9 } });
      
      return new Promise((resolve, reject) => {
        archive.pipe(output);
        
        segmentFiles.forEach(seg => {
          archive.file(seg.path, { name: seg.name });
        });
        
        archive.finalize();
        
        output.on('close', () => {
          resolve({
            segments: segments,
            segmentDuration,
            totalDuration: totalDuration.toFixed(2),
            outputFile: {
              name: `${requestId}-segments.zip`,
              mimeType: 'application/zip',
              base64: fs.readFileSync(zipPath).toString('base64'),
              tempPath: zipPath,
            },
          });
        });
        
        archive.on('error', reject);
      });
    } catch (error) {
      throw new Error(`Errore durante la divisione: ${error.message}`);
    }
  },
};


