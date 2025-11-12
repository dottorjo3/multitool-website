// 🔧 File: backend/tools/base64-encode.js
// 🔗 Farm Ready — Codifica Base64 testo o dati binari

module.exports = {
  async run({ params }) {
    const text = params?.text || '';
    const urlSafe = params?.urlSafe === 'true';
    const buffer = Buffer.from(text, 'utf8');
    let encoded = buffer.toString('base64');

    if (urlSafe) {
      encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    return {
      length: encoded.length,
      urlSafe,
      output: encoded,
    };
  },
};


