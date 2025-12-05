// 🔧 File: backend/tools/text-binary-to-text.js
// 🔗 Converte binario a testo

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    
    if (!input) {
      throw new Error('Inserisci il testo binario da convertire');
    }

    // Rimuovi spazi e separatori
    const cleaned = input.replace(/[^01]/g, '');
    
    if (cleaned.length === 0) {
      throw new Error('Nessun dato binario valido trovato');
    }

    if (cleaned.length % 8 !== 0) {
      throw new Error(`Il numero di bit deve essere multiplo di 8. Trovati ${cleaned.length} bit.`);
    }

    try {
      const bytes = [];
      for (let i = 0; i < cleaned.length; i += 8) {
        const byte = cleaned.substr(i, 8);
        bytes.push(parseInt(byte, 2));
      }
      
      const buffer = Buffer.from(bytes);
      const decoded = buffer.toString('utf8');
      
      return {
        original: input,
        decoded,
        binaryLength: cleaned.length,
        decodedLength: decoded.length,
        bytes: bytes.length,
      };
    } catch (error) {
      throw new Error(`Errore durante la conversione: ${error.message}`);
    }
  },
};

