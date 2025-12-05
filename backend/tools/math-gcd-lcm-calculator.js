// 🔧 File: backend/tools/math-gcd-lcm-calculator.js
// 🔗 Calcola MCD e mcm

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
    const number1 = parseInt(params.number1, 10);
    const number2 = parseInt(params.number2, 10);
    
    if (isNaN(number1) || isNaN(number2)) {
      throw new Error('Inserisci due numeri interi validi');
    }

    try {
      const gcdResult = gcd(number1, number2);
      const lcmResult = lcm(number1, number2);
      
      return {
        number1,
        number2,
        gcd: gcdResult,
        lcm: lcmResult,
        formula: `MCD(${number1}, ${number2}) = ${gcdResult}, mcm(${number1}, ${number2}) = ${lcmResult}`,
      };
    } catch (error) {
      throw new Error(`Errore nel calcolo: ${error.message}`);
    }
  },
};


