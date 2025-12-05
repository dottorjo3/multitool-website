// 🔧 File: backend/tools/security-hex-decode.js
// 🔗 Decodifica Hex

module.exports = {
  async run({ params }) {
    const hex = params.hex?.trim() || '';
    
    if (!hex) {
      throw new Error('Inserisci il testo hex da decodificare');
    }

    // Valida formato hex
    if (!/^[0-9a-fA-F]+$/.test(hex)) {
      throw new Error('Formato hex non valido (solo 0-9, a-f, A-F)');
    }

    try {
      const decoded = Buffer.from(hex, 'hex').toString('utf8');
      
      return {
        hex: hex.substring(0, 50) + '...',
        decoded,
        algorithm: 'Hex Decoding',
        originalLength: hex.length,
        decodedLength: decoded.length,
      };
    } catch (error) {
      throw new Error(`Errore durante la decodifica: ${error.message}`);
    }
  },
};


