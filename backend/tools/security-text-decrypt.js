// 🔧 File: backend/tools/security-text-decrypt.js
// 🔗 Decrittografia semplice testo

const crypto = require('crypto');

module.exports = {
  async run({ params }) {
    const encrypted = params.encrypted?.trim() || '';
    const password = params.password?.trim() || '';
    const algorithm = 'aes-256-cbc';
    
    if (!encrypted) {
      throw new Error('Inserisci il testo crittografato');
    }

    if (!password) {
      throw new Error('Inserisci la password per la decrittografia');
    }

    try {
      // Estrai IV e testo crittografato
      const parts = encrypted.split(':');
      if (parts.length !== 2) {
        throw new Error('Formato crittografato non valido');
      }
      
      const iv = Buffer.from(parts[0], 'hex');
      const encryptedText = parts[1];
      
      // Genera chiave da password
      const key = crypto.createHash('sha256').update(password).digest();
      
      const decipher = crypto.createDecipheriv(algorithm, key, iv);
      let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      return {
        encrypted: encrypted.substring(0, 50) + '...',
        decrypted,
        algorithm,
      };
    } catch (error) {
      throw new Error(`Errore durante la decrittografia: ${error.message}`);
    }
  },
};


