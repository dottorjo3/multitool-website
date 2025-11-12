// 🔧 File: backend/tools/text-letter-frequency.js
// 🔗 Calcola la frequenza delle lettere (A-Z)

module.exports = {
  async run({ params }) {
    const text = params.text ?? '';
    if (!text.trim()) {
      throw new Error('Inserisci il testo da analizzare');
    }

    const normalized = text.toUpperCase();
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const counts = letters.reduce((acc, letter) => ({ ...acc, [letter]: 0 }), {});

    let totalLetters = 0;
    for (const char of normalized) {
      if (counts[char] !== undefined) {
        counts[char] += 1;
        totalLetters += 1;
      }
    }

    const frequencies = letters
      .map((letter) => ({
        letter,
        count: counts[letter],
        percentage: totalLetters ? Number(((counts[letter] / totalLetters) * 100).toFixed(2)) : 0,
      }))
      .filter((item) => item.count > 0)
      .sort((a, b) => b.count - a.count);

    return {
      totalLetters,
      uniqueLetters: frequencies.length,
      frequencies,
      topFive: frequencies.slice(0, 5),
    };
  },
};



