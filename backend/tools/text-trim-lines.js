// 🔧 File: backend/tools/text-trim-lines.js
// 🔗 Rimuove spazi iniziali/finali da ogni riga mantenendo struttura

module.exports = {
  async run({ params }) {
    const text = params.text ?? '';
    if (!text) {
      throw new Error('Inserisci il testo da ripulire');
    }

    const lines = text.split(/\r?\n/);
    const trimmedLines = lines.map((line) => line.trim());

    return {
      originalLineCount: lines.length,
      trimmedLineCount: trimmedLines.length,
      result: trimmedLines.join('\n'),
    };
  },
};



