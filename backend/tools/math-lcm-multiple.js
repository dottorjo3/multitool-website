// 🔧 File: backend/tools/math-lcm-multiple.js
// 🔗 Calcola mcm di più numeri

function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return Math.abs(a);
}

function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

module.exports = {
  async run({ params }) {
    const numbers = params.numbers?.trim() || '';
    
    if (!numbers) {
      throw new Error('Inserisci una lista di numeri separati da virgola');
    }

    try {
      const numArray = numbers.split(',').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n));
      
      if (numArray.length < 2) {
        throw new Error('Inserisci almeno 2 numeri');
      }
      
      let result = numArray[0];
      for (let i = 1; i < numArray.length; i++) {
        result = lcm(result, numArray[i]);
      }
      
      return {
        numbers: numArray,
        lcm: result,
        count: numArray.length,
        formula: `mcm(${numArray.join(', ')}) = ${result}`,
      };
    } catch (error) {
      throw new Error(`Errore nel calcolo: ${error.message}`);
    }
  },
};


