// 🔧 File: backend/tools/text-sentence-counter.js
// 🔗 Calcola conteggio frasi e lunghezza media

module.exports = {
  async run({ params }) {
    const text = params.text?.trim();
    if (!text) {
      throw new Error('Inserisci il testo da analizzare');
    }

    const sentences = text
      .split(/(?<=[.!?])\s+/)
      .map((sentence) => sentence.trim())
      .filter(Boolean);

    const words = sentences.map((sentence) => sentence.split(/\s+/).filter(Boolean).length);

    const totalSentences = sentences.length;
    const totalWords = words.reduce((acc, count) => acc + count, 0);
    const averageWords = totalSentences > 0 ? Number((totalWords / totalSentences).toFixed(2)) : 0;

    return {
      sentences: totalSentences,
      totalWords,
      averageWordsPerSentence: averageWords,
      sentencesDetail: sentences.map((sentence, index) => ({
        index: index + 1,
        text: sentence,
        wordCount: words[index],
      })),
    };
  },
};



