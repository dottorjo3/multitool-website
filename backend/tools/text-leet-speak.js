// 🔧 File: backend/tools/text-leet-speak.js
// 🔗 Converte testo in leet speak (1337)

const LEET_MAP = {
  a: ['4', '@', 'а'],
  e: ['3', '€', 'є'],
  i: ['1', '!', 'і'],
  o: ['0', 'о'],
  s: ['5', '$', 'ѕ'],
  t: ['7', 'т'],
  l: ['1', '|'],
  g: ['9', '6'],
  b: ['8'],
  z: ['2'],
};

function toLeet(text, level = 'medium') {
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
      return replacements[Math.floor(Math.random() * replacements.length)];
    }
    return char;
  }).join('');
}

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const level = params.level || 'medium'; // 'low', 'medium', 'high', 'extreme'
    const mode = params.mode || 'encode'; // 'encode', 'decode'
    
    if (!input) {
      throw new Error('Inserisci il testo da convertire');
    }

    if (mode === 'decode') {
      // Decodifica leet speak (semplificata)
      let decoded = input;
      Object.entries(LEET_MAP).forEach(([letter, replacements]) => {
        replacements.forEach(replace => {
          const regex = new RegExp(replace.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
          decoded = decoded.replace(regex, letter);
        });
      });
      
      return {
        original: input,
        decoded,
        mode: 'decode',
      };
    }

    // Encode
    const encoded = toLeet(input, level);
    
    return {
      original: input,
      encoded,
      level,
      mode: 'encode',
    };
  },
};

