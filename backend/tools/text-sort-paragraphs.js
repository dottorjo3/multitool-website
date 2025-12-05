// 🔧 File: backend/tools/text-sort-paragraphs.js
// 🔗 Ordina i paragrafi alfabeticamente

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const order = params.order || 'asc'; // 'asc' o 'desc'
    
    if (!input) {
      throw new Error('Inserisci il testo con paragrafi da ordinare');
    }

    const paragraphs = input.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const sorted = order === 'desc' 
      ? [...paragraphs].sort((a, b) => b.localeCompare(a))
      : [...paragraphs].sort((a, b) => a.localeCompare(b));
    
    return {
      original: input,
      sorted: sorted.join('\n\n'),
      paragraphCount: paragraphs.length,
      order,
    };
  },
};

