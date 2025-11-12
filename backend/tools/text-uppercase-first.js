// 🔧 File: backend/tools/text-uppercase-first.js
// 🔗 Trasforma la prima lettera di ogni frase in maiuscolo

module.exports = {
  async run({ params }) {
    const text = params.text?.trim();
    if (!text) {
      throw new Error('Inserisci il testo da trasformare');
    }

    const result = text.replace(/([^.?!]*[^.?!\s])([.?!]+|\n|$)/g, (match) => {
      const trimmed = match.trimStart();
      return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    });

    return { originalLength: text.length, transformed: result };
  },
};


