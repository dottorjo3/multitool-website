// 🔧 File: backend/tools/text-readability.js
// 🔗 Calcola indici di leggibilità (Flesch Reading Ease / Grade Level)

function countSentences(text) {
  const matches = text.match(/[\w\)"][\.!?]+/g);
  return matches ? matches.length : 1;
}

function countWords(text) {
  const words = text
    .replace(/[^a-zA-ZàèéìòóùÁÈÉÌÒÓÙçÇñÑöÖüÜäÄß']/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
  return words.length;
}

function countSyllables(word) {
  const cleaned = word
    .toLowerCase()
    .replace(/[^a-zA-Z]/g, '');
  if (!cleaned) return 0;

  const vowelGroups = cleaned.match(/[aeiouy]+/g);
  if (!vowelGroups) return 1;

  let syllables = vowelGroups.length;

  if (cleaned.endsWith('e')) {
    syllables -= 1;
  }

  return Math.max(syllables, 1);
}

function totalSyllables(text) {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .reduce((sum, word) => sum + countSyllables(word), 0);
}

module.exports = {
  async run({ params }) {
    const text = params.text?.trim();

    if (!text) {
      throw new Error('Inserisci un testo da analizzare');
    }

    const sentences = countSentences(text);
    const words = countWords(text);
    const syllables = totalSyllables(text);

    if (words === 0) {
      throw new Error('Il testo deve contenere almeno una parola');
    }

    const wordsPerSentence = words / sentences;
    const syllablesPerWord = syllables / words;

    const fleschReadingEase = 206.835 - (1.015 * wordsPerSentence) - (84.6 * syllablesPerWord);
    const fleschKincaidGrade = (0.39 * wordsPerSentence) + (11.8 * syllablesPerWord) - 15.59;

    return {
      sentences,
      words,
      syllables,
      averages: {
        wordsPerSentence: Number(wordsPerSentence.toFixed(2)),
        syllablesPerWord: Number(syllablesPerWord.toFixed(2)),
      },
      scores: {
        fleschReadingEase: Number(fleschReadingEase.toFixed(2)),
        fleschKincaidGrade: Number(fleschKincaidGrade.toFixed(2)),
      },
    };
  },
};



