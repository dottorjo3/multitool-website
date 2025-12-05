// 🔧 File: backend/tools/text-auto-line-break.js
// 🔗 Aggiunge interruzioni di riga automatiche

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const maxLength = params.maxLength ? parseInt(params.maxLength, 10) : 80;
    
    if (!input) {
      throw new Error('Inserisci il testo da formattare');
    }

    if (maxLength < 10 || maxLength > 500) {
      throw new Error('La lunghezza massima deve essere tra 10 e 500 caratteri');
    }

    const lines = [];
    const words = input.split(/\s+/);
    let currentLine = '';
    
    words.forEach(word => {
      if ((currentLine + word).length <= maxLength) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        if (currentLine) {
          lines.push(currentLine);
        }
        currentLine = word;
      }
    });
    
    if (currentLine) {
      lines.push(currentLine);
    }
    
    return {
      original: input,
      formatted: lines.join('\n'),
      maxLength,
      lines: lines.length,
      originalLength: input.length,
    };
  },
};

