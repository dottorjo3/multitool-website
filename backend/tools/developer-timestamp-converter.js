// 🔧 File: backend/tools/developer-timestamp-converter.js
// 🔗 Converte timestamp Unix ↔ ISO8601

function parseInput(input, mode) {
  if (mode === 'unix-to-iso') {
    const value = Number(input);
    if (Number.isNaN(value)) {
      throw new Error('Timestamp Unix non valido');
    }
    return value < 1e12 ? value * 1000 : value;
  }

  const date = new Date(input);
  if (Number.isNaN(date.getTime())) {
    throw new Error('Data ISO non valida');
  }
  return date.getTime();
}

module.exports = {
  async run({ params }) {
    const input = params.input?.trim();
    const mode = params.mode || 'unix-to-iso';

    if (!input) {
      throw new Error('Inserisci un valore da convertire');
    }

    if (!['unix-to-iso', 'iso-to-unix'].includes(mode)) {
      throw new Error('Modalità non supportata');
    }

    if (mode === 'unix-to-iso') {
      const ms = parseInput(input, mode);
      const date = new Date(ms);
      return {
        mode,
        unix: Math.floor(ms / 1000),
        iso: date.toISOString(),
        locale: date.toLocaleString(),
        utc: date.toUTCString(),
      };
    }

    const ms = parseInput(input, mode);
    return {
      mode,
      unix: Math.floor(ms / 1000),
      iso: new Date(ms).toISOString(),
      milliseconds: ms,
    };
  },
};


