// 🔧 File: backend/tools/developer-regex-tester.js
// 🔗 Applica una regex a un testo e restituisce i match

module.exports = {
  async run({ params }) {
    const pattern = params.pattern ?? '';
    const flags = params.flags ?? 'g';
    const text = params.text ?? '';

    if (!pattern) {
      throw new Error('Inserisci una espressione regolare');
    }

    try {
      const regex = new RegExp(pattern, flags.includes('g') ? flags : `${flags}g`);
      const matches = [];
      let match;
      let iterations = 0;

      while ((match = regex.exec(text)) !== null) {
        iterations += 1;
        if (iterations > 5000) {
          throw new Error('Troppi match trovati; affina la regex');
        }
        matches.push({
          match: match[0],
          index: match.index,
          groups: match.slice(1),
        });

        if (regex.lastIndex === match.index) {
          regex.lastIndex += 1;
        }
      }

      return {
        pattern,
        flags: regex.flags,
        inputLength: text.length,
        matchesCount: matches.length,
        matches,
      };
    } catch (error) {
      throw new Error(`Regex non valida: ${error.message}`);
    }
  },
};

