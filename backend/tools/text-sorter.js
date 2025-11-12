// 🔧 File: backend/tools/text-sorter.js
// 🔗 Ordina righe di testo con opzioni di unicità e case sensitive

function normalizeLine(line, caseSensitive) {
  return caseSensitive ? line : line.toLowerCase();
}

module.exports = {
  async run({ params }) {
    const input = params.input ?? '';
    const order = params.order || 'asc';
    const caseSensitive = params.caseSensitive === 'true';
    const uniqueOnly = params.unique === 'true';
    const removeEmpty = params.removeEmpty === 'true';

    if (!input.trim()) {
      throw new Error('Inserisci del testo da ordinare');
    }

    let lines = input
      .split(/\r?\n/u)
      .map((line) => line.trim());

    if (removeEmpty) {
      lines = lines.filter((line) => line.length > 0);
    }

    if (uniqueOnly) {
      const seen = new Map();
      for (const line of lines) {
        const key = normalizeLine(line, caseSensitive);
        if (!seen.has(key)) {
          seen.set(key, line);
        }
      }
      lines = Array.from(seen.values());
    }

    const sorted = [...lines].sort((a, b) => {
      const valueA = normalizeLine(a, caseSensitive);
      const valueB = normalizeLine(b, caseSensitive);

      if (valueA < valueB) {
        return order === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });

    const output = sorted.join('\n');

    return {
      output,
      stats: {
        originalLines: input.split(/\r?\n/u).length,
        processedLines: sorted.length,
        uniqueApplied: uniqueOnly,
        order,
        caseSensitive,
        removeEmpty,
      },
    };
  },
};

