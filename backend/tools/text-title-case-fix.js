// 🔧 File: backend/tools/text-title-case-fix.js
// 🔗 Corregge il Title Case (capitalizza correttamente le parole)

const SMALL_WORDS = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'from', 'in', 'into', 'nor', 'of', 'on', 'or', 'the', 'to', 'with']);

function toTitleCase(text) {
  const words = text.toLowerCase().split(/\s+/);
  
  return words.map((word, index) => {
    // Prima parola sempre maiuscola
    if (index === 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    
    // Parole piccole sempre minuscole (tranne se sono la prima)
    if (SMALL_WORDS.has(word)) {
      return word;
    }
    
    // Altre parole: prima lettera maiuscola
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    
    if (!input) {
      throw new Error('Inserisci il testo da correggere');
    }

    const fixed = toTitleCase(input);
    
    return {
      original: input,
      fixed,
      length: input.length,
    };
  },
};

