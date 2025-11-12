// 🔧 File: backend/tools/developer-json-minify.js
// 🔗 Minifica JSON eliminando spazi e newline

module.exports = {
  async run({ params }) {
    const input = params.json;
    if (!input) {
      throw new Error('Inserisci il JSON da minificare');
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      return { minified };
    } catch (error) {
      throw new Error(`JSON non valido: ${error.message}`);
    }
  },
};



