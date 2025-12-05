// 🔧 File: backend/tools/security-argon2-verify.js
// 🔗 Verifica password con Argon2

const argon2 = require('argon2');

module.exports = {
  async run({ params }) {
    const password = params.password?.trim() || '';
    const hash = params.hash?.trim() || '';
    
    if (!password) {
      throw new Error('Inserisci la password da verificare');
    }

    if (!hash) {
      throw new Error('Inserisci l\'hash Argon2 da confrontare');
    }

    try {
      const isValid = await argon2.verify(hash, password);
      
      return {
        isValid,
        message: isValid 
          ? 'Password corretta ✓' 
          : 'Password errata ✗',
        algorithm: 'Argon2',
      };
    } catch (error) {
      throw new Error(`Errore durante la verifica: ${error.message}`);
    }
  },
};


