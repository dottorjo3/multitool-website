// 🔧 File: backend/tools/security-scrypt-hash.js
// 🔗 Hash con scrypt

const scrypt = require('scrypt-js');
const crypto = require('crypto');

module.exports = {
  async run({ params }) {
    const password = params.password?.trim() || '';
    const salt = params.salt?.trim() || Buffer.from(crypto.randomBytes(16)).toString('hex');
    const N = params.N ? parseInt(params.N, 10) : 16384;
    const r = params.r ? parseInt(params.r, 10) : 8;
    const p = params.p ? parseInt(params.p, 10) : 1;
    
    if (!password) {
      throw new Error('Inserisci una password da hashare');
    }

    try {
      const passwordBuffer = Buffer.from(password, 'utf8');
      const saltBuffer = Buffer.from(salt, 'hex');
      
      const hash = await scrypt.scrypt(passwordBuffer, saltBuffer, N, r, p, 64);
      
      return {
        original: '***',
        hashed: Buffer.from(hash).toString('hex'),
        salt,
        algorithm: 'scrypt',
        N,
        r,
        p,
        format: `${salt}:${Buffer.from(hash).toString('hex')}`,
        note: 'Hash scrypt per password. Usa gli stessi parametri per verificare.',
      };
    } catch (error) {
      throw new Error(`Errore durante l'hashing: ${error.message}`);
    }
  },
};

