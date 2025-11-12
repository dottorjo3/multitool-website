// 🔧 File: backend/tools/text-vowel-consonant.js
// 🔗 Conteggia vocali, consonanti, cifre e simboli

const VOWELS = new Set('AEIOUÀÈÉÌÒÓÙÆŒ');
const LETTERS = new Set('ABCDEFGHIJKLMNOPQRSTUVWXYZÀÈÉÌÒÓÙÂÊÎÔÛÄËÏÖÜŸÇÑÆŒ'.split(''));

module.exports = {
  async run({ params }) {
    const text = params.text ?? '';
    if (!text.trim()) {
      throw new Error('Inserisci il testo da analizzare');
    }

    let vowels = 0;
    let consonants = 0;
    let digits = 0;
    let whitespace = 0;
    let symbols = 0;

    for (const char of text.toUpperCase()) {
      if (/[0-9]/.test(char)) {
        digits += 1;
      } else if (/\s/.test(char)) {
        whitespace += 1;
      } else if (LETTERS.has(char)) {
        if (VOWELS.has(char)) vowels += 1;
        else consonants += 1;
      } else {
        symbols += 1;
      }
    }

    const totalChars = text.length;

    const percentage = (part) => (totalChars ? Number(((part / totalChars) * 100).toFixed(2)) : 0);

    return {
      totalCharacters: totalChars,
      vowels: { count: vowels, percentage: percentage(vowels) },
      consonants: { count: consonants, percentage: percentage(consonants) },
      digits: { count: digits, percentage: percentage(digits) },
      whitespace: { count: whitespace, percentage: percentage(whitespace) },
      symbols: { count: symbols, percentage: percentage(symbols) },
    };
  },
};



