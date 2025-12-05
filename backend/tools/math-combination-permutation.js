// 🔧 File: backend/tools/math-combination-permutation.js
// 🔗 Calcola combinazioni e permutazioni

function factorial(n) {
  if (n < 0) return 0;
  if (n === 0 || n === 1) return 1n;
  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) {
    result *= i;
  }
  return result;
}

module.exports = {
  async run({ params }) {
    const n = parseInt(params.n, 10) || 0;
    const r = parseInt(params.r, 10) || 0;
    const type = params.type || 'combination'; // 'combination', 'permutation'
    
    if (isNaN(n) || isNaN(r)) {
      throw new Error('Inserisci valori n e r validi');
    }

    if (n < 0 || r < 0) {
      throw new Error('I valori devono essere non negativi');
    }

    if (r > n) {
      throw new Error('r non può essere maggiore di n');
    }

    try {
      let result;
      let formula;
      
      if (type === 'combination') {
        // C(n,r) = n! / (r! * (n-r)!)
        result = factorial(n) / (factorial(r) * factorial(n - r));
        formula = `C(${n},${r}) = ${n}! / (${r}! × ${n-r}!) = ${result}`;
      } else {
        // P(n,r) = n! / (n-r)!
        result = factorial(n) / factorial(n - r);
        formula = `P(${n},${r}) = ${n}! / ${n-r}! = ${result}`;
      }
      
      return {
        n,
        r,
        type,
        result: result.toString(),
        formula,
      };
    } catch (error) {
      throw new Error(`Errore nel calcolo: ${error.message}`);
    }
  },
};


