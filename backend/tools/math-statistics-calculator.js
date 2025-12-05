// 🔧 File: backend/tools/math-statistics-calculator.js
// 🔗 Calcola statistiche da lista numeri

module.exports = {
  async run({ params }) {
    const numbers = params.numbers?.trim() || '';
    
    if (!numbers) {
      throw new Error('Inserisci una lista di numeri separati da virgola');
    }

    try {
      const numArray = numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
      
      if (numArray.length === 0) {
        throw new Error('Nessun numero valido trovato');
      }
      
      numArray.sort((a, b) => a - b);
      
      const sum = numArray.reduce((a, b) => a + b, 0);
      const mean = sum / numArray.length;
      const median = numArray.length % 2 === 0
        ? (numArray[numArray.length / 2 - 1] + numArray[numArray.length / 2]) / 2
        : numArray[Math.floor(numArray.length / 2)];
      
      const variance = numArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / numArray.length;
      const stdDev = Math.sqrt(variance);
      
      const min = numArray[0];
      const max = numArray[numArray.length - 1];
      const range = max - min;
      
      return {
        numbers: numArray,
        count: numArray.length,
        sum,
        mean: mean.toFixed(4),
        median: median.toFixed(4),
        min,
        max,
        range,
        variance: variance.toFixed(4),
        stdDev: stdDev.toFixed(4),
      };
    } catch (error) {
      throw new Error(`Errore nel calcolo: ${error.message}`);
    }
  },
};


