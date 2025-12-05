// 🔧 File: backend/tools/security-aes-encrypt.js
// 🔗 Crittografia AES

const crypto = require('crypto');
const CryptoJS = require('crypto-js');

module.exports = {
  async run({ params }) {
    const text = params.text?.trim() || '';
    const password = params.password?.trim() || '';
    const algorithm = params.algorithm || 'aes-256-cbc';
    
    if (!text) {
      throw new Error('Inserisci il testo da crittografare');
    }

    if (!password) {
      throw new Error('Inserisci una password per la crittografia');
    }

    try {
      // Usa CryptoJS per AES semplice
      const encrypted = CryptoJS.AES.encrypt(text, password).toString();
      
      return {
        original: text,
        encrypted,
        algorithm: 'AES-256-CBC',
        passwordSet: !!password,
        note: 'Crittografia AES-256-CBC. Mantieni la password sicura per decrittografare.',
      };
    } catch (error) {
      throw new Error(`Errore durante la crittografia: ${error.message}`);
    }
  },
};


