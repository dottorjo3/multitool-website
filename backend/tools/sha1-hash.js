// 🔧 File: backend/tools/sha1-hash.js
// 🔗 Farm Ready — Generatore hash SHA1

const crypto = require('crypto');

module.exports = {
  async run({ params }) {
    const text = params?.text || '';
    const hash = crypto.createHash('sha1').update(text, 'utf8').digest('hex');
    return {
      algorithm: 'sha1',
      length: hash.length,
      output: hash,
    };
  },
};


