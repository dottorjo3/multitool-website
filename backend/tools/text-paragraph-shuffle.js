// 🔧 File: backend/tools/text-paragraph-shuffle.js
// 🔗 Mescola i paragrafi in ordine casuale

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    
    if (!input) {
      throw new Error('Inserisci il testo con paragrafi da mescolare');
    }

    const paragraphs = input.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const shuffled = shuffleArray(paragraphs);
    
    return {
      original: input,
      shuffled: shuffled.join('\n\n'),
      paragraphCount: paragraphs.length,
    };
  },
};

