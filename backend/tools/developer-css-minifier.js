// 🔧 File: backend/tools/developer-css-minifier.js
// 🔗 Minifica codice CSS (semplificato)

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    
    if (!input) {
      throw new Error('Inserisci del codice CSS da minificare');
    }

    try {
      // Minificazione CSS base (rimuove spazi, commenti, etc.)
      let minified = input
        // Rimuovi commenti
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Rimuovi spazi multipli
        .replace(/\s+/g, ' ')
        // Rimuovi spazi prima/ dopo caratteri speciali
        .replace(/\s*([{}:;,])\s*/g, '$1')
        // Rimuovi punto e virgola finale
        .replace(/;}/g, '}')
        // Rimuovi spazi iniziali/finali
        .trim();
      
      return {
        original: input,
        minified,
        originalLength: input.length,
        minifiedLength: minified.length,
        compressionRatio: ((1 - minified.length / input.length) * 100).toFixed(2) + '%',
      };
    } catch (error) {
      throw new Error(`Errore durante la minificazione: ${error.message}`);
    }
  },
};

