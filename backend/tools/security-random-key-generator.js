// 🔧 File: backend/tools/security-random-key-generator.js
// 🔗 Genera chiavi casuali sicure

const crypto = require('crypto');

module.exports = {
  async run({ params }) {
    const length = params.length ? parseInt(params.length, 10) : 32;
    const encoding = params.encoding || 'hex'; // 'hex', 'base64', 'base64url'
    
    if (length < 16 || length > 256) {
      throw new Error('Lunghezza deve essere tra 16 e 256 caratteri');
    }

    try {
      let key;
      
      switch (encoding) {
        case 'hex':
          key = crypto.randomBytes(length / 2).toString('hex');
          break;
        case 'base64':
          key = crypto.randomBytes(length).toString('base64').substring(0, length);
          break;
        case 'base64url':
          key = crypto.randomBytes(length).toString('base64url').substring(0, length);
          break;
        default:
          throw new Error('Encoding non supportato (hex, base64, base64url)');
      }
      
      return {
        key,
        length: key.length,
        encoding,
        algorithm: 'crypto.randomBytes',
        note: 'Chiave generata in modo sicuro usando crypto.randomBytes',
      };
    } catch (error) {
      throw new Error(`Errore durante la generazione: ${error.message}`);
    }
  },
};


