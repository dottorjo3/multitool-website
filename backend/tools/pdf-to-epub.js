// 🔧 File: backend/tools/pdf-to-epub.js
// 🔗 Converte PDF a EPUB

module.exports = {
  async run({ params, filesMeta }) {
    if (!filesMeta || filesMeta.length === 0) {
      throw new Error('Carica un file PDF da convertire');
    }

    try {
      const file = filesMeta[0];
      
      // Conversione PDF → EPUB richiede librerie specializzate
      return {
        fileName: file.originalName,
        format: 'EPUB',
        note: 'Conversione PDF → EPUB richiede calibre o pandoc. Estensione futura.',
        ready: false,
      };
    } catch (error) {
      throw new Error(`Errore durante la conversione: ${error.message}`);
    }
  },
};


