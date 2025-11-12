// 🔧 File: backend/tools/developer-random-bytes.js
// 🔗 Genera byte casuali in formato hex/base64

const crypto = require('crypto');

module.exports = {
  async run({ params }) {
    const length = params.length ? Number(params.length) : 32;
    const encoding = (params.encoding || 'hex').toLowerCase();

    if (!Number.isInteger(length) || length < 1 || length > 1024) {
      throw new Error('La lunghezza deve essere compresa tra 1 e 1024 byte');
    }
    if (!['hex', 'base64'].includes(encoding)) {
      throw new Error('Encoding non supportato (hex o base64)');
    }

    const buffer = crypto.randomBytes(length);

    return {
      length,
      encoding,
      output: buffer.toString(encoding),
    };
  },
};


