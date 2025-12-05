// 🔧 File: backend/tools/text-compare-two-texts.js
// 🔗 Confronta due testi con statistiche dettagliate

const { diffWords } = require('diff');

module.exports = {
  async run({ params }) {
    const text1 = params.text1?.trim() || '';
    const text2 = params.text2?.trim() || '';
    
    if (!text1 || !text2) {
      throw new Error('Inserisci entrambi i testi da confrontare');
    }

    const diff = diffWords(text1, text2);
    
    const stats = {
      text1Length: text1.length,
      text2Length: text2.length,
      text1Words: text1.split(/\s+/).filter(w => w.length > 0).length,
      text2Words: text2.split(/\s+/).filter(w => w.length > 0).length,
      added: diff.filter(p => p.added).reduce((sum, p) => sum + p.value.split(/\s+/).length, 0),
      removed: diff.filter(p => p.removed).reduce((sum, p) => sum + p.value.split(/\s+/).length, 0),
      unchanged: diff.filter(p => !p.added && !p.removed).reduce((sum, p) => sum + p.value.split(/\s+/).length, 0),
      similarity: 0,
    };
    
    // Calcola similarità
    const totalWords = stats.text1Words + stats.text2Words;
    if (totalWords > 0) {
      stats.similarity = ((stats.unchanged / totalWords) * 100).toFixed(2);
    }
    
    return {
      text1,
      text2,
      diff,
      stats,
    };
  },
};

