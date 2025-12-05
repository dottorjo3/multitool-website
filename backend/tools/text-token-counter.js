// 🔧 File: backend/tools/text-token-counter.js
// 🔗 Conta token (parole, caratteri, etc.) con statistiche avanzate

function tokenize(text, method = 'words') {
  switch (method) {
    case 'words':
      return text.split(/\s+/).filter(w => w.length > 0);
    case 'characters':
      return text.split('');
    case 'sentences':
      return text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    case 'paragraphs':
      return text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    default:
      return text.split(/\s+/).filter(w => w.length > 0);
  }
}

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const method = params.method || 'words';
    
    if (!input) {
      throw new Error('Inserisci il testo da analizzare');
    }

    const tokens = tokenize(input, method);
    const uniqueTokens = new Set(tokens.map(t => t.toLowerCase()));
    
    return {
      text: input,
      method,
      totalTokens: tokens.length,
      uniqueTokens: uniqueTokens.size,
      averageLength: tokens.length > 0 
        ? (tokens.reduce((sum, t) => sum + t.length, 0) / tokens.length).toFixed(2)
        : 0,
      minLength: tokens.length > 0 ? Math.min(...tokens.map(t => t.length)) : 0,
      maxLength: tokens.length > 0 ? Math.max(...tokens.map(t => t.length)) : 0,
    };
  },
};

