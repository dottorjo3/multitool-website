// 🔧 File: backend/tools/text-sentence-extractor.js
// 🔗 Estrae frasi con posizione e lunghezza

module.exports = {
  async run({ params }) {
    const text = params.text ?? '';
    if (!text.trim()) {
      throw new Error('Inserisci il testo da analizzare');
    }

    const regex = /[^.!?]+[.!?]?/g;
    const matches = text.match(regex) || [];

    const sentences = [];
    let index = 0;

    for (const match of matches) {
      const trimmed = match.trim();
      if (trimmed) {
        const start = text.indexOf(match, index);
        sentences.push({
          index: sentences.length + 1,
          text: trimmed,
          length: trimmed.length,
          start,
          end: start + trimmed.length,
        });
        index = start + match.length;
      } else {
        index += match.length;
      }
    }

    return {
      total: sentences.length,
      sentences,
    };
  },
};



