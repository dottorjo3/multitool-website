// 🔧 File: backend/tools/security-pbkdf2-hash.js
// 🔗 Hash con PBKDF2

const crypto = require('crypto');

module.exports = {
  async run({ params }) {
    const password = params.password?.trim() || '';
    const salt = params.salt?.trim() || crypto.randomBytes(16).toString('hex');
    const iterations = params.iterations ? parseInt(params.iterations, 10) : 100000;
    const keyLength = params.keyLength ? parseInt(params.keyLength, 10) : 64;
    const algorithm = params.algorithm || 'sha256';
    
    if (!password) {
      throw new Error('Inserisci una password da hashare');
    }

    if (iterations < 1000 || iterations > 1000000) {
      throw new Error('Iterazioni deve essere tra 1000 e 1000000');
    }

    try {
      const hash = crypto.pbkdf2Sync(password, salt, iterations, keyLength, algorithm).toString('hex');
      
      return {
        original: '***',
        hashed: hash,
        salt,
        algorithm: `PBKDF2-${algorithm.toUpperCase()}`,
        iterations,
        keyLength,
        format: `${salt}:${hash}`,
        note: 'PBKDF2 con salt. Usa lo stesso salt per verificare.',
      };
    } catch (error) {
      throw new Error(`Errore durante l'hashing: ${error.message}`);
    }
  },
};


