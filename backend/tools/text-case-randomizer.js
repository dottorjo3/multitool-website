// 🔧 File: backend/tools/text-case-randomizer.js
// 🔗 Randomizza maiuscole/minuscole

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    
    if (!input) {
      throw new Error('Inserisci il testo da randomizzare');
    }

    const randomized = input.split('').map(char => {
      if (!/[a-zA-Z]/.test(char)) {
        return char;
      }
      return Math.random() < 0.5 ? char.toLowerCase() : char.toUpperCase();
    }).join('');
    
    return {
      original: input,
      randomized,
      length: input.length,
    };
  },
};

