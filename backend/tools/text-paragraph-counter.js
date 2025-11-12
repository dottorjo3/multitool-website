// 🔧 File: backend/tools/text-paragraph-counter.js
// 🔗 Calcola conteggio paragrafi e statistiche sulle lunghezze

module.exports = {
  async run({ params }) {
    const text = params.text?.trim();
    if (!text) {
      throw new Error('Inserisci il testo da analizzare');
    }

    const paragraphs = text
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    const stats = paragraphs.map((paragraph, index) => {
      const words = paragraph.split(/\s+/).filter(Boolean);
      const characters = paragraph.replace(/\s/g, '').length;
      return {
        index: index + 1,
        text: paragraph,
        words: words.length,
        characters,
      };
    });

    const totalParagraphs = stats.length;
    const totalWords = stats.reduce((sum, item) => sum + item.words, 0);
    const totalCharacters = stats.reduce((sum, item) => sum + item.characters, 0);

    return {
      paragraphs: totalParagraphs,
      totalWords,
      totalCharacters,
      averageWords: totalParagraphs ? Number((totalWords / totalParagraphs).toFixed(2)) : 0,
      averageCharacters: totalParagraphs ? Number((totalCharacters / totalParagraphs).toFixed(2)) : 0,
      details: stats,
    };
  },
};



