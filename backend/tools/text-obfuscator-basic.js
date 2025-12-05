// 🔧 File: backend/tools/text-obfuscator-basic.js
// 🔗 Offusca testo di base (sostituisce caratteri con simili)

const OBFUSCATE_MAP = {
  'a': ['а', 'α', '@'],
  'e': ['е', 'є', '€'],
  'i': ['і', '1', '!'],
  'o': ['о', '0', '○'],
  'u': ['υ', 'μ'],
  'c': ['с', '©'],
  'p': ['р'],
  'x': ['х', '×'],
  'y': ['у'],
};

function obfuscate(text, level = 'medium') {
  const levelMap = {
    low: 0.2,
    medium: 0.4,
    high: 0.6,
  };
  
  const replacementRate = levelMap[level] || 0.4;
  
  return text.split('').map(char => {
    const lower = char.toLowerCase();
    if (OBFUSCATE_MAP[lower] && Math.random() < replacementRate) {
      const replacements = OBFUSCATE_MAP[lower];
      const replacement = replacements[Math.floor(Math.random() * replacements.length)];
      // Mantieni il case originale
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
      throw new Error('Inserisci il testo da offuscare');
    }

    const obfuscated = obfuscate(input, level);
    
    return {
      original: input,
      obfuscated,
      level,
      length: input.length,
    };
  },
};

