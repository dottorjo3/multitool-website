// 🔧 File: backend/tools/url-encode.js
// 🔗 Farm Ready — Percent-encode di stringhe URL

module.exports = {
  async run({ params }) {
    const text = params?.text || '';
    const encodeSpaces = params?.encodeSpaces === 'true';

    let encoded = encodeURIComponent(text);
    if (encodeSpaces) {
      encoded = encoded.replace(/%20/g, '+');
    }

    return {
      encodeSpaces,
      output: encoded,
    };
  },
};


