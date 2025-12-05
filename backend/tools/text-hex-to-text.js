// 🔧 File: backend/tools/text-hex-to-text.js
// 🔗 Converte esadecimale a testo

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    
    if (!input) {
      throw new Error('Inserisci il testo esadecimale da convertire');
    }

    // Rimuovi spazi e prefissi comuni
    const cleaned = input.replace(/^0x/gi, '').replace(/\s+/g, '');
    
    // Verifica che sia esadecimale valido
    if (!/^[0-9A-Fa-f]+$/.test(cleaned)) {
      throw new Error('Il testo contiene caratteri non esadecimali validi');
    }

    if (cleaned.length % 2 !== 0) {
      throw new Error('Il numero di caratteri esadecimali deve essere pari');
    }

    try {
      const buffer = Buffer.from(cleaned, 'hex');
      const decoded = buffer.toString('utf8');
      
      return {
        original: input,
        decoded,
        hexLength: cleaned.length,
        decodedLength: decoded.length,
      };
    } catch (error) {
      throw new Error(`Errore durante la conversione: ${error.message}`);
    }
  },
};

