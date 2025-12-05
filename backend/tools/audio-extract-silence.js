// 🔧 File: backend/tools/audio-extract-silence.js
// 🔗 Rileva e segnala silenzi nell'audio

const { runFfmpeg } = require('../core/ffmpeg');

module.exports = {
  async run({ params, filesMeta }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un file audio');
    }

    const file = filesMeta[0];
    const threshold = params.threshold || '-35dB';
    const duration = params.duration || '0.5';
    
    try {
      // Usa silencedetect per trovare silenzi
      const args = [
        '-i', file.filePath,
        '-af', `silencedetect=noise=${threshold}:d=${duration}`,
        '-f', 'null',
        '-',
      ];
      
      // Per ora restituiamo info (l'output di silencedetect va parsato)
      return {
        fileName: file.originalName,
        threshold,
        duration,
        note: 'Rilevamento silenzi richiede parsing output ffmpeg. Estensione futura.',
        ready: true,
      };
    } catch (error) {
      throw new Error(`Errore durante rilevamento silenzi: ${error.message}`);
    }
  },
};


