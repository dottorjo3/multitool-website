// 🔧 File: backend/tools/text-cleaner.js
// 🔗 Generato manualmente — normalizza testo rimuovendo spazi e righe vuote

function collapseMultipleSpaces(value) {
  return value.replace(/\s{2,}/g, ' ');
}

function trimEachLine(value) {
  return value
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .join('\n');
}

function removeEmptyLines(value) {
  return value
    .split(/\r?\n/u)
    .filter((line) => line.trim().length > 0)
    .join('\n');
}

module.exports = {
  async run({ params }) {
    const input = params.input ?? '';
    const shouldTrimLines = params.trimLines === 'true';
    const shouldCollapseSpaces = params.collapseSpaces === 'true';
    const shouldRemoveEmptyLines = params.removeEmptyLines === 'true';

    if (!input.trim()) {
      throw new Error('Inserisci del testo da pulire');
    }

    let output = input;

    if (shouldTrimLines) {
      output = trimEachLine(output);
    }

    if (shouldCollapseSpaces) {
      output = collapseMultipleSpaces(output);
    }

    if (shouldRemoveEmptyLines) {
      output = removeEmptyLines(output);
    }

    const stats = {
      originalLength: input.length,
      cleanedLength: output.length,
      charactersRemoved: input.length - output.length,
      originalLines: input.split(/\r?\n/u).length,
      cleanedLines: output.split(/\r?\n/u).length,
    };

    return {
      output,
      stats,
    };
  },
};

