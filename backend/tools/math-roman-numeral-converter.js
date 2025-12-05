// 🔧 File: backend/tools/math-roman-numeral-converter.js
// 🔗 Convertitore numeri romani

function romanToNumber(roman) {
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let result = 0;
  
  for (let i = 0; i < roman.length; i++) {
    const current = map[roman[i]];
    const next = map[roman[i + 1]];
    
    if (next && current < next) {
      result += next - current;
      i++;
    } else {
      result += current;
    }
  }
  
  return result;
}

function numberToRoman(num) {
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const numerals = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  let result = '';
  
  for (let i = 0; i < values.length; i++) {
    while (num >= values[i]) {
      result += numerals[i];
      num -= values[i];
    }
  }
  
  return result;
}

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const direction = params.direction || 'to-roman'; // 'to-roman', 'from-roman'
    
    if (!input) {
      throw new Error('Inserisci un numero o numero romano');
    }

    try {
      if (direction === 'to-roman') {
        const num = parseInt(input, 10);
        if (isNaN(num) || num < 1 || num > 3999) {
          throw new Error('Il numero deve essere tra 1 e 3999');
        }
        const roman = numberToRoman(num);
        return {
          input,
          direction: 'to-roman',
          result: roman,
          original: num,
        };
      } else {
        const number = romanToNumber(input.toUpperCase());
        return {
          input: input.toUpperCase(),
          direction: 'from-roman',
          result: number,
          original: input.toUpperCase(),
        };
      }
    } catch (error) {
      throw new Error(`Errore nella conversione: ${error.message}`);
    }
  },
};


