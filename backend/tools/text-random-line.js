// 🔧 File: backend/tools/text-random-line.js
// 🔗 Estrae righe casuali dal testo

function randomSample(array, count) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

module.exports = {
  async run({ params }) {
    const input = params.input ?? '';
    const count = params.count ? Number(params.count) : 1;
    const ensureUnique = params.unique === 'true';
    const removeEmpty = params.removeEmpty === 'true';

    if (!input.trim()) {
      throw new Error('Inserisci del testo da cui estrarre le righe');
    }

    if (!Number.isInteger(count) || count < 1) {
      throw new Error('Il numero di righe da estrarre deve essere >= 1');
    }

    let lines = input.split(/\r?\n/u);

    if (removeEmpty) {
      lines = lines.filter((line) => line.trim().length > 0);
    }

    if (ensureUnique) {
      lines = Array.from(new Set(lines));
    }

    if (lines.length === 0) {
      throw new Error('Nessuna riga disponibile dopo i filtri applicati');
    }

    const selection = randomSample(lines, Math.min(count, lines.length));

    return {
      output: selection.join('\n'),
      stats: {
        requested: count,
        returned: selection.length,
        totalAvailable: lines.length,
        unique: ensureUnique,
        removeEmpty,
      },
    };
  },
};

