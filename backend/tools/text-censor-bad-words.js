// 🔧 File: backend/tools/text-censor-bad-words.js
// 🔗 Censura parole inappropriate

const BAD_WORDS = new Set([
  // Aggiungere lista di parole inappropriate
  // Per ora usiamo una lista base
]);

function censorWord(word, replacement = '*') {
  if (word.length <= 2) return word;
  return word.charAt(0) + replacement.repeat(word.length - 2) + word.charAt(word.length - 1);
}

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const customWords = params.customWords?.trim() || '';
    const replacement = params.replacement || '*';
    
    if (!input) {
      throw new Error('Inserisci il testo da censurare');
    }

    let censored = input;
    const wordsToCensor = customWords 
      ? customWords.split(',').map(w => w.trim().toLowerCase()).filter(Boolean)
      : [];
    
    const allWords = new Set([...BAD_WORDS, ...wordsToCensor]);
    
    if (allWords.size > 0) {
      allWords.forEach(word => {
        const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
        censored = censored.replace(regex, (match) => {
          if (replacement === '*') {
            return censorWord(match, replacement);
          }
          return replacement.repeat(match.length);
        });
      });
    }
    
    return {
      original: input,
      censored,
      replacement,
      wordsCensored: allWords.size,
    };
  },
};

