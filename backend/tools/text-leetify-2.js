// 🔧 File: backend/tools/text-leetify-2.js
// 🔗 Versione avanzata di leet speak

const LEET_MAP = {
  'a': ['4', '@', 'а'],
  'e': ['3', '€', 'є'],
  'i': ['1', '!', 'і'],
  'o': ['0', 'о'],
  's': ['5', '$', 'ѕ'],
  't': ['7', 'т'],
  'l': ['1', '|'],
  'g': ['9', '6'],
  'b': ['8'],
  'z': ['2'],
};

function leetify(text, level = 'medium') {
  const levelMap = {
    low: 0.3,
    medium: 0.5,
    high: 0.7,
    extreme: 0.9,
  };
  
  const replacementRate = levelMap[level] || 0.5;
  
  return text.split('').map(char => {
    const lower = char.toLowerCase();
    if (LEET_MAP[lower] && Math.random() < replacementRate) {
      const replacements = LEET_MAP[lower];
      const replacement = replacements[Math.floor(Math.random() * replacements.length)];
      return char === char.toUpperCase() ? replacement.toUpperCase() : replacement;
    }
    return char;
  }).join('');
}

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const level = params.level || 'medium';
    
    if (!input) {
      throw new Error('Inserisci il testo da convertire');
    }

    const leetified = leetify(input, level);
    
    return {
      original: input,
      leetified,
      level,
      length: input.length,
    };
  },
};

