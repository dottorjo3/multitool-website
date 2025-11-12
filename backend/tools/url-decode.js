// 🔧 File: backend/tools/url-decode.js
// 🔗 Farm Ready — Decodifica percent-encoding

module.exports = {
  async run({ params }) {
    let text = params?.text || '';
    const plusAsSpace = params?.plusAsSpace === 'true';

    if (plusAsSpace) {
      text = text.replace(/\+/g, '%20');
    }

    let decoded;
    try {
      decoded = decodeURIComponent(text);
    } catch (error) {
      throw new Error('Stringa non valida per la decodifica URL');
    }

    return {
      plusAsSpace,
      output: decoded,
    };
  },
};


