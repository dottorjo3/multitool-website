// 🔧 File: backend/tools/text-compress.js
// 🔗 Comprime testo usando zlib (gzip)

const zlib = require('zlib');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    
    if (!input) {
      throw new Error('Inserisci il testo da comprimere');
    }

    try {
      const compressed = zlib.gzipSync(Buffer.from(input, 'utf8'));
      const base64 = compressed.toString('base64');
      
      return {
        original: input,
        compressed: base64,
        originalLength: input.length,
        compressedLength: compressed.length,
        compressionRatio: ((1 - compressed.length / input.length) * 100).toFixed(2) + '%',
      };
    } catch (error) {
      throw new Error(`Errore durante la compressione: ${error.message}`);
    }
  },
};

