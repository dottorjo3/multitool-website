// 🔧 File: backend/tools/security-bcrypt-hash.js
// 🔗 Hash password con bcrypt

const bcrypt = require('bcrypt');

module.exports = {
  async run({ params }) {
    const password = params.password?.trim() || '';
    const saltRounds = params.saltRounds ? parseInt(params.saltRounds, 10) : 10;
    
    if (!password) {
      throw new Error('Inserisci una password da hashare');
    }

    if (saltRounds < 4 || saltRounds > 15) {
      throw new Error('Salt rounds deve essere tra 4 e 15');
    }

    try {
      const hash = await bcrypt.hash(password, saltRounds);
      
      return {
        original: '***',
        hashed: hash,
        algorithm: 'bcrypt',
        saltRounds,
        note: 'Hash bcrypt sicuro per password. Usa bcrypt-verify per verificare.',
      };
    } catch (error) {
      throw new Error(`Errore durante l'hashing: ${error.message}`);
    }
  },
};


