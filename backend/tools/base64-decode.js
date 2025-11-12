// 🔧 File: backend/tools/base64-decode.js
// 🔗 Farm Ready — Decodifica Base64 con supporto url-safe

module.exports = {
  async run({ params }) {
    let input = params?.text || '';
    const urlSafe = params?.urlSafe === 'true';

    if (urlSafe) {
      input = input.replace(/-/g, '+').replace(/_/g, '/');
      while (input.length % 4) {
        input += '=';
      }
    }

    let decoded;
    try {
      decoded = Buffer.from(input, 'base64').toString('utf8');
    } catch (error) {
      throw new Error('Stringa Base64 non valida');
    }

    return {
      urlSafe,
      length: decoded.length,
      output: decoded,
    };
  },
};


