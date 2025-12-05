// 🔧 File: backend/tools/math-prime-checker.js
// 🔗 Verifica se un numero è primo

function isPrime(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  
  const sqrt = Math.sqrt(n);
  for (let i = 3; i <= sqrt; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function getFactors(n) {
  const factors = [];
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      factors.push(i);
      if (i !== n / i) {
        factors.push(n / i);
      }
    }
  }
  return factors.sort((a, b) => a - b);
}

module.exports = {
  async run({ params }) {
    const number = parseInt(params.number, 10);
    
    if (isNaN(number) || number < 1) {
      throw new Error('Inserisci un numero intero positivo valido');
    }

    try {
      const prime = isPrime(number);
      const factors = prime ? [1, number] : getFactors(number);
      
      return {
        number,
        isPrime: prime,
        factors,
        factorCount: factors.length,
        message: prime 
          ? `${number} è un numero primo`
          : `${number} non è un numero primo (fattori: ${factors.join(', ')})`,
      };
    } catch (error) {
      throw new Error(`Errore nella verifica: ${error.message}`);
    }
  },
};


