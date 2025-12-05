// 🔧 File: backend/tools/text-rot13.js
// 🔗 Codifica/decodifica ROT13

function rot13(text) {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const code = char.charCodeAt(0);
    const base = code <= 90 ? 65 : 97; // 'A' o 'a'
    return String.fromCharCode(((code - base + 13) % 26) + base);
  });
}

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    
    if (!input) {
      throw new Error('Inserisci il testo da codificare/decodificare');
    }

    const encoded = rot13(input);
    const isEncoded = encoded !== input; // ROT13 è simmetrico

    return {
      original: input,
      result: encoded,
      isEncoded,
      length: input.length,
    };
  },
};

