// 🔧 File: backend/tools/security-crc32-calculator.js
// 🔗 Calcola CRC32

const crc = require('crc');

module.exports = {
  async run({ params }) {
    const text = params.text?.trim() || '';
    
    if (!text) {
      throw new Error('Inserisci il testo o carica un file');
    }

    try {
      const checksum = crc.crc32(text).toString(16).padStart(8, '0');
      
      return {
        original: text.substring(0, 50) + '...',
        checksum,
        algorithm: 'CRC32',
        format: 'hex',
        length: text.length,
        note: 'CRC32 è un checksum per rilevare errori, non per sicurezza',
      };
    } catch (error) {
      throw new Error(`Errore durante il calcolo: ${error.message}`);
    }
  },
};


