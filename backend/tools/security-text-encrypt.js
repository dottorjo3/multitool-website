// 🔧 File: backend/tools/security-text-encrypt.js
// 🔗 Crittografia semplice testo

const crypto = require('crypto');

module.exports = {
  async run({ params }) {
    const text = params.text?.trim() || '';
    const password = params.password?.trim() || '';
    const algorithm = 'aes-256-cbc';
    
    if (!text) {
      throw new Error('Inserisci il testo da crittografare');
    }

    if (!password) {
      throw new Error('Inserisci una password per la crittografia');
    }

    try {
      // Genera chiave da password usando SHA256
      const key = crypto.createHash('sha256').update(password).digest();
      const iv = crypto.randomBytes(16);
      
      const cipher = crypto.createCipheriv(algorithm, key, iv);
      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      // Combina IV + encrypted
      const result = iv.toString('hex') + ':' + encrypted;
      
      return {
        original: text.substring(0, 20) + '...',
        encrypted: result,
        algorithm,
        passwordSet: !!password,
        format: 'hex',
      };
    } catch (error) {
      throw new Error(`Errore durante la crittografia: ${error.message}`);
    }
  },
};


