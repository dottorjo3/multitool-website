// 🔧 File: backend/tools/text-number-to-words.js
// 🔗 Converte numeri a parole (italiano/inglese)

const ONES_EN = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const TENS_EN = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const TEENS_EN = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

const ONES_IT = ['', 'uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove'];
const TENS_IT = ['', '', 'venti', 'trenta', 'quaranta', 'cinquanta', 'sessanta', 'settanta', 'ottanta', 'novanta'];
const TEENS_IT = ['dieci', 'undici', 'dodici', 'tredici', 'quattordici', 'quindici', 'sedici', 'diciassette', 'diciotto', 'diciannove'];

function convertHundreds(num, lang) {
  const ones = lang === 'it' ? ONES_IT : ONES_EN;
  const tens = lang === 'it' ? TENS_IT : TENS_EN;
  const teens = lang === 'it' ? TEENS_IT : TEENS_EN;
  
  if (num === 0) return '';
  if (num < 10) return ones[num];
  if (num < 20) return teens[num - 10];
  if (num < 100) {
    const ten = Math.floor(num / 10);
    const one = num % 10;
    if (one === 0) return tens[ten];
    if (lang === 'it' && one === 1) return tens[ten].slice(0, -1) + 'uno';
    if (lang === 'it' && one === 8) return tens[ten].slice(0, -1) + 'otto';
    return tens[ten] + (lang === 'it' ? '' : '-') + ones[one];
  }
  
  const hundred = Math.floor(num / 100);
  const remainder = num % 100;
  const hundredWord = lang === 'it' 
    ? (hundred === 1 ? 'cento' : ones[hundred] + 'cento')
    : ones[hundred] + ' hundred';
  
  if (remainder === 0) return hundredWord;
  return hundredWord + (lang === 'it' ? '' : ' ') + convertHundreds(remainder, lang);
}

function numberToWords(num, lang = 'en') {
  if (num === 0) return lang === 'it' ? 'zero' : 'zero';
  if (num < 0) return (lang === 'it' ? 'meno ' : 'negative ') + numberToWords(-num, lang);
  
  if (num < 1000) {
    return convertHundreds(num, lang);
  }
  
  if (num < 1000000) {
    const thousands = Math.floor(num / 1000);
    const remainder = num % 1000;
    const thousandWord = lang === 'it' 
      ? (thousands === 1 ? 'mille' : convertHundreds(thousands, lang) + 'mila')
      : convertHundreds(thousands, lang) + ' thousand';
    
    if (remainder === 0) return thousandWord;
    return thousandWord + ' ' + convertHundreds(remainder, lang);
  }
  
  return lang === 'it' ? 'numero troppo grande' : 'number too large';
}

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const language = params.language || 'en'; // 'en' o 'it'
    
    if (!input) {
      throw new Error('Inserisci un numero da convertire');
    }

    const number = parseInt(input, 10);
    
    if (isNaN(number)) {
      throw new Error('Inserisci un numero valido');
    }

    if (Math.abs(number) > 999999) {
      throw new Error('Il numero deve essere compreso tra -999999 e 999999');
    }

    const words = numberToWords(number, language);
    
    return {
      number,
      words,
      language,
    };
  },
};

