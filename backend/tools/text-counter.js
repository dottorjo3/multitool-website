// 🔧 File: backend/tools/text-counter.js
// 🔗 Farm Ready — Conteggio parole, caratteri, linee

module.exports = {
  async run({ params }) {
    const text = params?.text || '';
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
    const lines = text.split(/\r?\n/);
    const sentences = trimmed ? trimmed.split(/[.!?]+/).filter((s) => s.trim().length) : [];

    return {
      characters: text.length,
      charactersNoSpaces: text.replace(/\s+/g, '').length,
      words: words.length,
      lines: lines.length,
      sentences: sentences.length,
      paragraphs: trimmed ? trimmed.split(/\n{2,}/).filter(Boolean).length : 0,
    };
  },
};


