// 🔧 File: backend/tools/developer-hmac-generator.js
// 🔗 Calcola HMAC per il testo usando una chiave segreta

const crypto = require('crypto');

const ALGORITHMS = ['sha1', 'sha256', 'sha384', 'sha512', 'md5'];

module.exports = {
  async run({ params }) {
    const text = params.text ?? '';
    const secret = params.secret ?? '';
    const algorithm = (params.algorithm || 'sha256').toLowerCase();
    const encoding = (params.encoding || 'hex').toLowerCase();

    if (!text) {
      throw new Error('Inserisci il testo su cui calcolare l’HMAC');
    }
    if (!secret) {
      throw new Error('Inserisci la chiave segreta');
    }
    if (!ALGORITHMS.includes(algorithm)) {
      throw new Error(`Algoritmo non supportato. Usa uno di: ${ALGORITHMS.join(', ')}`);
    }
    if (!['hex', 'base64'].includes(encoding)) {
      throw new Error('Encoding non supportato (hex o base64)');
    }

    const hmac = crypto.createHmac(algorithm, secret).update(text, 'utf8').digest(encoding);

    return {
      algorithm,
      encoding,
      hmac,
    };
  },
};


