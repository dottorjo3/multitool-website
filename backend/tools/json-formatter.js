// 🔧 File: backend/tools/json-formatter.js
// 🔗 Farm Ready — Formatter JSON con validazione e minify

module.exports = {
  async run({ params }) {
    const input = params?.json || '';
    const spaces = params?.spaces ? Number(params.spaces) : 2;
    const minify = params?.minify === 'true';

    let parsed;
    try {
      parsed = JSON.parse(input);
    } catch (error) {
      throw new Error(`JSON non valido: ${error.message}`);
    }

    const formatted = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, Number.isNaN(spaces) ? 2 : spaces);

    return {
      minify,
      spaces: minify ? 0 : spaces,
      sizeBytes: Buffer.byteLength(formatted, 'utf8'),
      output: formatted,
    };
  },
};


