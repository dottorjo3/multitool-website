// 🔧 File: backend/tools/sha256-hash.js
// 🔗 Farm Ready — Generatore hash SHA256

const crypto = require('crypto');

module.exports = {
  async run({ params }) {
    const text = params?.text || '';
    const hash = crypto.createHash('sha256').update(text, 'utf8').digest('hex');
    return {
      algorithm: 'sha256',
      length: hash.length,
      output: hash,
    };
  },
};


