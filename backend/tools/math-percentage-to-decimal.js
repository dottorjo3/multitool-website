// 🔧 File: backend/tools/math-percentage-to-decimal.js
// 🔗 Converti percentuale in decimale e viceversa

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const direction = params.direction || 'percent-to-decimal'; // 'percent-to-decimal', 'decimal-to-percent'
    
    if (!input) {
      throw new Error('Inserisci un valore');
    }

    try {
      const value = parseFloat(input);
      
      if (isNaN(value)) {
        throw new Error('Inserisci un valore numerico valido');
      }

      if (direction === 'percent-to-decimal') {
        const decimal = value / 100;
        return {
          input,
          direction: 'percent-to-decimal',
          percent: value,
          decimal,
          formatted: decimal.toLocaleString('it-IT', { maximumFractionDigits: 10 }),
        };
      } else {
        const percent = value * 100;
        return {
          input,
          direction: 'decimal-to-percent',
          decimal: value,
          percent,
          formatted: `${percent.toLocaleString('it-IT', { maximumFractionDigits: 2 })}%`,
        };
      }
    } catch (error) {
      throw new Error(`Errore nella conversione: ${error.message}`);
    }
  },
};


