// 🔧 File: backend/tools/math-fibonacci-generator.js
// 🔗 Genera sequenza Fibonacci

function fibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];
  
  const seq = [0, 1];
  for (let i = 2; i < n; i++) {
    seq.push(seq[i - 1] + seq[i - 2]);
  }
  return seq;
}

module.exports = {
  async run({ params }) {
    const count = parseInt(params.count, 10) || 10;
    
    if (isNaN(count) || count < 1) {
      throw new Error('Inserisci un numero positivo valido');
    }

    if (count > 1000) {
      throw new Error('Massimo 1000 numeri');
    }

    try {
      const sequence = fibonacci(count);
      
      return {
        count,
        sequence,
        lastNumber: sequence[sequence.length - 1],
        sum: sequence.reduce((a, b) => a + b, 0),
      };
    } catch (error) {
      throw new Error(`Errore nella generazione: ${error.message}`);
    }
  },
};


