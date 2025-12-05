// 🔧 File: backend/tools/math-factorial-calculator.js
// 🔗 Calcola fattoriale

function factorial(n) {
  if (n < 0) throw new Error('Il fattoriale non è definito per numeri negativi');
  if (n === 0 || n === 1) return 1n;
  
  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) {
    result *= i;
  }
  return result;
}

module.exports = {
  async run({ params }) {
    const number = parseInt(params.number, 10);
    
    if (isNaN(number)) {
      throw new Error('Inserisci un numero intero valido');
    }

    if (number < 0) {
      throw new Error('Il fattoriale non è definito per numeri negativi');
    }

    if (number > 170) {
      throw new Error('Numero troppo grande (massimo 170)');
    }

    try {
      const result = factorial(number);
      
      return {
        number,
        factorial: result.toString(),
        digits: result.toString().length,
        scientific: result > 1e15 ? result.toExponential() : result.toString(),
      };
    } catch (error) {
      throw new Error(`Errore nel calcolo: ${error.message}`);
    }
  },
};


