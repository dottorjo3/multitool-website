// 🔧 File: backend/tools/text-number-to-roman.js
// 🔗 Converte numeri arabi a numeri romani

function numberToRoman(num) {
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const numerals = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  
  let result = '';
  let remaining = num;
  
  for (let i = 0; i < values.length; i++) {
    while (remaining >= values[i]) {
      result += numerals[i];
      remaining -= values[i];
    }
  }
  
  return result;
}

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    
    if (!input) {
      throw new Error('Inserisci un numero da convertire');
    }

    const number = parseInt(input, 10);
    
    if (isNaN(number) || number < 1 || number > 3999) {
      throw new Error('Inserisci un numero valido tra 1 e 3999');
    }

    const roman = numberToRoman(number);
    
    return {
      number,
      roman,
    };
  },
};

