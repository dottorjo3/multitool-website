// 🔧 File: backend/tools/audio-batch-convert.js
// 🔗 Converte più file audio in batch

const path = require('path');
const fs = require('fs');
const archiver = require('archiver');
const { TMP_DIR } = require('../core/config');
const { runFfmpeg } = require('../core/ffmpeg');

const AUDIO_FORMATS = {
  mp3: { codec: ['-c:a', 'libmp3lame'], extension: 'mp3', mime: 'audio/mpeg' },
  wav: { codec: ['-c:a', 'pcm_s16le'], extension: 'wav', mime: 'audio/wav' },
  ogg: { codec: ['-c:a', 'libvorbis'], extension: 'ogg', mime: 'audio/ogg' },
  aac: { codec: ['-c:a', 'aac'], extension: 'aac', mime: 'audio/aac' },
  flac: { codec: ['-c:a', 'flac'], extension: 'flac', mime: 'audio/flac' },
};

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length === 0) {
      throw new Error('Carica almeno un file audio');
    }

    const format = params.format?.toLowerCase() || 'mp3';
    const bitrate = params.bitrate || '192';
    
    if (!AUDIO_FORMATS[format]) {
      throw new Error(`Formato ${format} non supportato`);
    }

    try {
      const formatConfig = AUDIO_FORMATS[format];
      const convertedFiles = [];
      
      for (const file of filesMeta) {
        const outputName = `${requestId}-${file.originalName.replace(/\.[^/.]+$/, '')}.${formatConfig.extension}`;
        const outputPath = path.resolve(TMP_DIR, outputName);
        
        const args = [
          '-i', file.filePath,
          ...formatConfig.codec,
          '-b:a', `${bitrate}k`,
          '-y',
          outputPath,
        ];
        
        await runFfmpeg(args);
        
        convertedFiles.push({
          originalName: file.originalName,
          outputName,
          path: outputPath,
        });
      }
      
      // Crea ZIP
      const zipPath = path.resolve(TMP_DIR, `${requestId}-converted.zip`);
      const output = fs.createWriteStream(zipPath);
      const archive = archiver('zip', { zlib: { level: 9 } });
      
      return new Promise((resolve, reject) => {
        archive.pipe(output);
        
        convertedFiles.forEach(file => {
          archive.file(file.path, { name: file.outputName });
        });
        
        archive.finalize();
        
        output.on('close', () => {
          resolve({
            filesCount: convertedFiles.length,
            format,
            outputFile: {
              name: `${requestId}-converted.zip`,
              mimeType: 'application/zip',
              base64: fs.readFileSync(zipPath).toString('base64'),
              tempPath: zipPath,
            },
          });
        });
        
        archive.on('error', reject);
      });
    } catch (error) {
      throw new Error(`Errore durante conversione batch: ${error.message}`);
    }
  },
};


