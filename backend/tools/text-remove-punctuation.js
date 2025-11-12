// 🔧 File: backend/tools/text-remove-punctuation.js
// 🔗 Rimuove la punteggiatura dal testo

module.exports = {
  async run({ params }) {
    const text = params.text ?? '';
    if (!text) {
      throw new Error('Inserisci il testo da ripulire');
    }

    const cleaned = text.replace(/[.,/#!$%^&*;:{}=\-_`~()\"'¿¡?¡<>[\]|\\]/g, '').replace(/\s{2,}/g, ' ');

    return {
      originalLength: text.length,
      cleanedLength: cleaned.length,
      cleaned,
    };
  },
};


