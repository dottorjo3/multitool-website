// 🔧 File: backend/tools/math-number-to-words.js
// 🔗 Converte numero in parole (italiano)

const ones = ['', 'uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove'];
const tens = ['', '', 'venti', 'trenta', 'quaranta', 'cinquanta', 'sessanta', 'settanta', 'ottanta', 'novanta'];
const teens = ['dieci', 'undici', 'dodici', 'tredici', 'quattordici', 'quindici', 'sedici', 'diciassette', 'diciotto', 'diciannove'];

function convertHundreds(num) {
  if (num === 0) return '';
  if (num === 1) return 'cento';
  
  let result = '';
  const hundreds = Math.floor(num / 100);
  const remainder = num % 100;
  
  if (hundreds > 0) {
    result = ones[hundreds] + 'cento';
    if (hundreds === 1) result = 'cento';
  }
  
  if (remainder < 10) {
    result += ones[remainder];
  } else if (remainder < 20) {
    result += teens[remainder - 10];
  } else {
    const ten = Math.floor(remainder / 10);
    const one = remainder % 10;
    result += tens[ten];
    result += ones[one];
  }
  
  return result;
}

function numberToWords(num) {
  if (num === 0) return 'zero';
  if (num < 0) return 'meno ' + numberToWords(-num);
  
  if (num < 1000) {
    return convertHundreds(num);
  }
  
  if (num < 1000000) {
    const thousands = Math.floor(num / 1000);
    const remainder = num % 1000;
    let result = convertHundreds(thousands) + 'mila';
    if (thousands === 1) result = 'mille';
    if (remainder > 0) {
      result += convertHundreds(remainder);
    }
    return result;
  }
  
  return 'Numero troppo grande';
}

module.exports = {
  async run({ params }) {
    const number = parseFloat(params.number) || 0;
    
    if (isNaN(number)) {
      throw new Error('Inserisci un numero valido');
    }

    if (!Number.isInteger(number)) {
      throw new Error('Inserisci un numero intero');
    }

    if (Math.abs(number) > 999999) {
      throw new Error('Numero troppo grande (massimo 999999)');
    }

    try {
      const words = numberToWords(Math.floor(number));
      
      return {
        number,
        words,
        formatted: words.charAt(0).toUpperCase() + words.slice(1),
      };
    } catch (error) {
      throw new Error(`Errore nella conversione: ${error.message}`);
    }
  },
};


