// 🔧 File: backend/tools/text-line-number.js
// 🔗 Aggiunge numerazione progressiva alle righe di testo

module.exports = {
  async run({ params }) {
    const input = params.input ?? '';
    const startFrom = params.start ? Number(params.start) : 1;
    const padWidth = params.padWidth ? Number(params.padWidth) : 2;
    const separator = params.separator ?? '. ';
    const removeEmpty = params.removeEmpty === 'true';

    if (!input.trim()) {
      throw new Error('Inserisci del testo da numerare');
    }

    if (!Number.isFinite(startFrom)) {
      throw new Error('Valore iniziale non valido');
    }

    if (!Number.isInteger(padWidth) || padWidth < 0 || padWidth > 10) {
      throw new Error('Pad width non valido');
    }

    const lines = input.split(/\r?\n/u);
    let counter = startFrom;

    const numberedLines = lines.map((line) => {
      const trimmed = line.trim();
      if (removeEmpty && trimmed.length === 0) {
        return line;
      }

      const label = String(counter).padStart(padWidth, '0');
      counter += 1;
      return `${label}${separator}${line}`;
    });

    return {
      output: numberedLines.join('\n'),
      stats: {
        originalLines: lines.length,
        numberingStart: startFrom,
        padWidth,
        separator,
        removeEmpty,
      },
    };
  },
};

