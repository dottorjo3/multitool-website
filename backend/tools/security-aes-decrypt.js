// 🔧 File: backend/tools/security-aes-decrypt.js
// 🔗 Decrittografia AES

const CryptoJS = require('crypto-js');

module.exports = {
  async run({ params }) {
    const encrypted = params.encrypted?.trim() || '';
    const password = params.password?.trim() || '';
    
    if (!encrypted) {
      throw new Error('Inserisci il testo crittografato');
    }

    if (!password) {
      throw new Error('Inserisci la password per la decrittografia');
    }

    try {
      const decrypted = CryptoJS.AES.decrypt(encrypted, password);
      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
      
      if (!decryptedText) {
        throw new Error('Password errata o formato crittografato non valido');
      }
      
      return {
        encrypted: encrypted.substring(0, 50) + '...',
        decrypted: decryptedText,
        algorithm: 'AES-256-CBC',
      };
    } catch (error) {
      throw new Error(`Errore durante la decrittografia: ${error.message}`);
    }
  },
};


