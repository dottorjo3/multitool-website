// 🔧 File: backend/tools/developer-html-minifier.js
// 🔗 Minifica codice HTML

const { minify } = require('html-minifier-terser');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const removeComments = params.removeComments !== 'false';
    const collapseWhitespace = params.collapseWhitespace !== 'false';
    const minifyCSS = params.minifyCSS === 'true';
    const minifyJS = params.minifyJS === 'true';
    
    if (!input) {
      throw new Error('Inserisci del codice HTML da minificare');
    }

    try {
      const minified = await minify(input, {
        removeComments,
        collapseWhitespace,
        minifyCSS,
        minifyJS,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      });
      
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


