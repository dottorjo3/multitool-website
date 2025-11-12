// 🔧 File: backend/tools/developer-uuid-v1.js
// 🔗 Genera UUID v1 (time-based)

const { v1: uuidv1 } = require('uuid');

module.exports = {
  async run({ params }) {
    const count = params.count ? Number(params.count) : 1;

    if (!Number.isInteger(count) || count < 1 || count > 100) {
      throw new Error('Il numero di UUID deve essere compreso tra 1 e 100');
    }

    const uuids = Array.from({ length: count }, () => uuidv1());

    return {
      version: 'v1',
      count,
      uuids,
    };
  },
};


