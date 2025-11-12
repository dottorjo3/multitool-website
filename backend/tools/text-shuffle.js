// 🔧 File: backend/tools/text-shuffle.js
// 🔗 Mescola le righe di testo in ordine casuale con opzione limite

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

module.exports = {
  async run({ params }) {
    const input = params.input ?? '';
    const limit = params.limit ? Number(params.limit) : null;
    const ensureUnique = params.unique === 'true';
    const removeEmpty = params.removeEmpty === 'true';

    if (!input.trim()) {
      throw new Error('Inserisci del testo da mescolare');
    }

    let lines = input
      .split(/\r?\n/u)
      .map((line) => line.trim());

    if (removeEmpty) {
      lines = lines.filter((line) => line.length > 0);
    }

    if (ensureUnique) {
      const set = new Set(lines);
      lines = Array.from(set);
    }

    const shuffled = shuffleArray(lines);

    const limited = Number.isInteger(limit) && limit > 0
      ? shuffled.slice(0, Math.min(limit, shuffled.length))
      : shuffled;

    return {
      output: limited.join('\n'),
      stats: {
        originalLines: input.split(/\r?\n/u).length,
        processedLines: limited.length,
        totalAfterFilters: shuffled.length,
        limit: limit || null,
        unique: ensureUnique,
        removeEmpty,
      },
    };
  },
};

