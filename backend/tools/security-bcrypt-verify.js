// 🔧 File: backend/tools/security-bcrypt-verify.js
// 🔗 Verifica password con bcrypt

const bcrypt = require('bcrypt');

module.exports = {
  async run({ params }) {
    const password = params.password?.trim() || '';
    const hash = params.hash?.trim() || '';
    
    if (!password) {
      throw new Error('Inserisci la password da verificare');
    }

    if (!hash) {
      throw new Error('Inserisci l\'hash bcrypt da confrontare');
    }

    try {
      const isValid = await bcrypt.compare(password, hash);
      
      return {
        isValid,
        message: isValid 
          ? 'Password corretta ✓' 
          : 'Password errata ✗',
        algorithm: 'bcrypt',
      };
    } catch (error) {
      throw new Error(`Errore durante la verifica: ${error.message}`);
    }
  },
};


