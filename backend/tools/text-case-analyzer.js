// 🔧 File: backend/tools/text-case-analyzer.js
// 🔗 Analizza il case del testo

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    
    if (!input) {
      throw new Error('Inserisci il testo da analizzare');
    }

    const stats = {
      uppercase: 0,
      lowercase: 0,
      mixed: 0,
      words: input.split(/\s+/).filter(w => w.length > 0).length,
      characters: input.length,
    };
    
    input.split(/\s+/).forEach(word => {
      if (word.length === 0) return;
      
      if (word === word.toUpperCase() && /[A-Z]/.test(word)) {
        stats.uppercase++;
      } else if (word === word.toLowerCase() && /[a-z]/.test(word)) {
        stats.lowercase++;
      } else {
        stats.mixed++;
      }
    });
    
    const totalWords = stats.uppercase + stats.lowercase + stats.mixed;
    const percentages = {
      uppercase: totalWords > 0 ? ((stats.uppercase / totalWords) * 100).toFixed(2) : 0,
      lowercase: totalWords > 0 ? ((stats.lowercase / totalWords) * 100).toFixed(2) : 0,
      mixed: totalWords > 0 ? ((stats.mixed / totalWords) * 100).toFixed(2) : 0,
    };
    
    return {
      original: input,
      stats,
      percentages,
    };
  },
};

