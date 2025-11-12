// 🔧 File: backend/tools/md5-hash.js
// 🔗 Farm Ready — Generatore hash MD5

const crypto = require('crypto');

module.exports = {
  async run({ params }) {
    const text = params?.text || '';
    const hash = crypto.createHash('md5').update(text, 'utf8').digest('hex');
    return {
      algorithm: 'md5',
      length: hash.length,
      output: hash,
    };
  },
};


