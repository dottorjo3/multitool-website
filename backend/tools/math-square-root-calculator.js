// 🔧 File: backend/tools/math-square-root-calculator.js
// 🔗 Calcola radice quadrata

module.exports = {
  async run({ params }) {
    const number = parseFloat(params.number) || 0;
    
    if (isNaN(number)) {
      throw new Error('Inserisci un numero valido');
    }

    if (number < 0) {
      throw new Error('Non puoi calcolare la radice quadrata di un numero negativo (usa numeri complessi)');
    }

    try {
      const result = Math.sqrt(number);
      
      return {
        number,
        squareRoot: result,
        formatted: result.toLocaleString('it-IT', { maximumFractionDigits: 10 }),
        power: Math.pow(result, 2),
        verified: Math.abs(Math.pow(result, 2) - number) < 0.0001,
      };
    } catch (error) {
      throw new Error(`Errore nel calcolo: ${error.message}`);
    }
  },
};


