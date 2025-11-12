// 🔧 File: backend/tools/text-prefix-suffix.js
// 🔗 Aggiunge prefisso e suffisso a ogni riga/linea di testo

module.exports = {
  async run({ params }) {
    const input = params.input ?? '';
    const prefix = params.prefix ?? '';
    const suffix = params.suffix ?? '';
    const skipEmpty = params.skipEmpty === 'true';

    if (!input.trim()) {
      throw new Error('Inserisci del testo da modificare');
    }

    const originalLines = input.split(/\r?\n/u);
    const processedLines = originalLines.map((line) => {
      if (skipEmpty && line.trim().length === 0) {
        return line;
      }
      return `${prefix}${line}${suffix}`;
    });

    const output = processedLines.join('\n');

    return {
      output,
      stats: {
        originalLines: originalLines.length,
        prefixLength: prefix.length,
        suffixLength: suffix.length,
        skipEmpty,
      },
    };
  },
};

