// 🔧 File: backend/tools/math-basic-calculator.js
// 🔗 Calcolatrice base

const math = require('mathjs');

module.exports = {
  async run({ params }) {
    const expression = params.expression?.trim() || '';
    
    if (!expression) {
      throw new Error('Inserisci un\'espressione matematica');
    }

    try {
      const result = math.evaluate(expression);
      
      return {
        expression,
        result,
        formatted: typeof result === 'number' 
          ? result.toLocaleString('it-IT', { maximumFractionDigits: 10 })
          : String(result),
        type: typeof result,
      };
    } catch (error) {
      throw new Error(`Errore nell'espressione: ${error.message}`);
    }
  },
};


