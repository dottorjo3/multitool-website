// 🔧 File: backend/tools/sha512-hash.js
// 🔗 Farm Ready — Generatore hash SHA512

const crypto = require('crypto');

module.exports = {
  async run({ params }) {
    const text = params?.text || '';
    const hash = crypto.createHash('sha512').update(text, 'utf8').digest('hex');
    return {
      algorithm: 'sha512',
      length: hash.length,
      output: hash,
    };
  },
};


