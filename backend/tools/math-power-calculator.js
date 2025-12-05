// 🔧 File: backend/tools/math-power-calculator.js
// 🔗 Calcola potenza

module.exports = {
  async run({ params }) {
    const base = parseFloat(params.base) || 0;
    const exponent = parseFloat(params.exponent) || 0;
    
    if (isNaN(base) || isNaN(exponent)) {
      throw new Error('Inserisci base ed esponente validi');
    }

    try {
      const result = Math.pow(base, exponent);
      
      return {
        base,
        exponent,
        result,
        formatted: result.toLocaleString('it-IT', { maximumFractionDigits: 10, useGrouping: true }),
        formula: `${base}^${exponent} = ${result}`,
        scientific: result > 1e10 || result < 1e-10 ? result.toExponential() : null,
      };
    } catch (error) {
      throw new Error(`Errore nel calcolo: ${error.message}`);
    }
  },
};


