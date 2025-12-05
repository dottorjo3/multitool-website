// 🔧 File: backend/tools/security-argon2-hash.js
// 🔗 Hash password con Argon2

const argon2 = require('argon2');

module.exports = {
  async run({ params }) {
    const password = params.password?.trim() || '';
    const type = params.type || 'argon2id'; // 'argon2id', 'argon2i', 'argon2d'
    
    if (!password) {
      throw new Error('Inserisci una password da hashare');
    }

    try {
      const hash = await argon2.hash(password, {
        type: argon2[type.toUpperCase()] || argon2.argon2id,
      });
      
      return {
        original: '***',
        hashed: hash,
        algorithm: 'Argon2',
        type,
        note: 'Hash Argon2 moderno e sicuro per password. Usa argon2-verify per verificare.',
      };
    } catch (error) {
      throw new Error(`Errore durante l'hashing: ${error.message}`);
    }
  },
};


