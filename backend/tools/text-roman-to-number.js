// 🔧 File: backend/tools/text-roman-to-number.js
// 🔗 Converte numeri romani a numeri arabi

const ROMAN_VALUES = {
  'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000
};

function romanToNumber(roman) {
  const upper = roman.toUpperCase();
  let result = 0;
  let prev = 0;
  
  for (let i = upper.length - 1; i >= 0; i--) {
    const current = ROMAN_VALUES[upper[i]] || 0;
    if (current < prev) {
      result -= current;
    } else {
      result += current;
    }
    prev = current;
  }
  
  return result;
}

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    
    if (!input) {
      throw new Error('Inserisci un numero romano da convertire');
    }

    try {
      const number = romanToNumber(input);
      
      return {
        roman: input.toUpperCase(),
        number,
        isValid: number > 0,
      };
    } catch (error) {
      throw new Error(`Errore durante la conversione: ${error.message}`);
    }
  },
};

