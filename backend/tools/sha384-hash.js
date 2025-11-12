// 🔧 File: backend/tools/sha384-hash.js
// 🔗 Farm Ready — Generatore hash SHA384

const crypto = require('crypto');

module.exports = {
  async run({ params }) {
    const text = params?.text || '';
    const hash = crypto.createHash('sha384').update(text, 'utf8').digest('hex');
    return {
      algorithm: 'sha384',
      length: hash.length,
      output: hash,
    };
  },
};


