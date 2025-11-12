// 🔧 File: backend/tools/developer-json-pretty.js
// 🔗 Formatta JSON con indentazione personalizzata

module.exports = {
  async run({ params }) {
    const input = params.json;
    if (!input) {
      throw new Error('Inserisci il JSON da formattare');
    }

    try {
      const parsed = JSON.parse(input);
      const spaces = params.spaces ? Number(params.spaces) : 2;
      const formatted = JSON.stringify(parsed, null, Number.isNaN(spaces) ? 2 : spaces);
      return { formatted };
    } catch (error) {
      throw new Error(`JSON non valido: ${error.message}`);
    }
  },
};


