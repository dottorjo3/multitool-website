// 🔧 File: backend/tools/audio-metadata.js
// 🔗 Estrae metadati audio

const { parseFile } = require('music-metadata');

module.exports = {
  async run({ params, filesMeta }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un file audio');
    }

    const file = filesMeta[0];
    
    try {
      const metadata = await parseFile(file.filePath);
      
      return {
        fileName: file.originalName,
        format: {
          container: metadata.format.container,
          codec: metadata.format.codec,
          bitrate: metadata.format.bitrate,
          sampleRate: metadata.format.sampleRate,
          duration: metadata.format.duration,
          numberOfChannels: metadata.format.numberOfChannels,
        },
        common: {
          title: metadata.common.title,
          artist: metadata.common.artist,
          album: metadata.common.album,
          year: metadata.common.year,
          genre: metadata.common.genre,
          track: metadata.common.track,
        },
        picture: metadata.common.picture ? {
          format: metadata.common.picture[0].format,
          dataLength: metadata.common.picture[0].data.length,
        } : null,
      };
    } catch (error) {
      throw new Error(`Errore durante l'estrazione metadati: ${error.message}`);
    }
  },
};


