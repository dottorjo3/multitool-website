// 🔧 File: backend/tools/text-text-to-binary.js
// 🔗 Converte testo a binario

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const separator = params.separator || ' '; // Separatore tra byte
    
    if (!input) {
      throw new Error('Inserisci il testo da convertire in binario');
    }

    const binary = Array.from(Buffer.from(input, 'utf8'))
      .map(byte => byte.toString(2).padStart(8, '0'))
      .join(separator);
    
    return {
      original: input,
      binary,
      length: input.length,
      binaryLength: binary.length,
      bytes: Array.from(Buffer.from(input, 'utf8')).length,
    };
  },
};

