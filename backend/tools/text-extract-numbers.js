// 🔧 File: backend/tools/text-extract-numbers.js
// 🔗 Estrae numeri da un testo

module.exports = {
  async run({ params }) {
    const text = params.input?.trim() || '';
    const includeDecimals = params.includeDecimals !== 'false';
    const includeNegative = params.includeNegative !== 'false';
    
    if (!text) {
      throw new Error('Inserisci il testo da cui estrarre i numeri');
    }

    // Regex per numeri interi e decimali
    let regex;
    if (includeDecimals && includeNegative) {
      regex = /-?\d+\.?\d*/g;
    } else if (includeDecimals) {
      regex = /\d+\.?\d*/g;
    } else if (includeNegative) {
      regex = /-?\d+/g;
    } else {
      regex = /\d+/g;
    }

    const numbers = [];
    let match;
    let index = 0;

    while ((match = regex.exec(text)) !== null) {
      const numStr = match[0];
      const num = includeDecimals ? parseFloat(numStr) : parseInt(numStr, 10);
      
      numbers.push({
        number: num,
        original: numStr,
        position: match.index,
      });
    }

    return {
      count: numbers.length,
      numbers: numbers.map(n => n.number),
      numbersWithPosition: numbers,
      sum: numbers.reduce((acc, n) => acc + n.number, 0),
      average: numbers.length > 0 ? numbers.reduce((acc, n) => acc + n.number, 0) / numbers.length : 0,
    };
  },
};

