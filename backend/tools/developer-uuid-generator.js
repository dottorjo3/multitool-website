// 🔧 File: backend/tools/developer-uuid-generator.js
// 🔗 Genera UUID v4 multipli

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async run({ params }) {
    const count = params.count ? Number(params.count) : 1;

    if (!Number.isInteger(count) || count < 1 || count > 100) {
      throw new Error('Il numero di UUID deve essere compreso tra 1 e 100');
    }

    const uuids = Array.from({ length: count }, () => uuidv4());

    return {
      count,
      uuids,
    };
  },
};


