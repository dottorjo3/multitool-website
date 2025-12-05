// 🔧 File: backend/tools/text-decompress.js
// 🔗 Decomprime testo da zlib (gzip)

const zlib = require('zlib');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    
    if (!input) {
      throw new Error('Inserisci il testo compresso da decomprimere');
    }

    try {
      const buffer = Buffer.from(input, 'base64');
      const decompressed = zlib.gunzipSync(buffer).toString('utf8');
      
      return {
        original: input,
        decompressed,
        compressedLength: buffer.length,
        decompressedLength: decompressed.length,
      };
    } catch (error) {
      throw new Error(`Errore durante la decompressione: ${error.message}. Assicurati che il testo sia compresso in formato gzip base64.`);
    }
  },
};

