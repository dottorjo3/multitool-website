// 🔧 File: backend/tools/math-percentage-difference.js
// 🔗 Calcola differenza percentuale

module.exports = {
  async run({ params }) {
    const value1 = parseFloat(params.value1) || 0;
    const value2 = parseFloat(params.value2) || 0;
    
    if (isNaN(value1) || isNaN(value2)) {
      throw new Error('Inserisci valori numerici validi');
    }

    if (value1 === 0 && value2 === 0) {
      throw new Error('I valori non possono essere entrambi zero');
    }

    try {
      const difference = value2 - value1;
      const percentChange = value1 === 0 
        ? (value2 > 0 ? 100 : -100)
        : (difference / Math.abs(value1)) * 100;
      
      const isIncrease = difference > 0;
      const isDecrease = difference < 0;
      
      return {
        value1,
        value2,
        difference,
        percentChange: percentChange.toFixed(2),
        isIncrease,
        isDecrease,
        formatted: `${isIncrease ? '+' : ''}${percentChange.toFixed(2)}%`,
        absoluteChange: Math.abs(difference),
      };
    } catch (error) {
      throw new Error(`Errore nel calcolo: ${error.message}`);
    }
  },
};


