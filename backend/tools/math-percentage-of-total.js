// 🔧 File: backend/tools/math-percentage-of-total.js
// 🔗 Calcola percentuale di un totale

module.exports = {
  async run({ params }) {
    const part = parseFloat(params.part) || 0;
    const total = parseFloat(params.total) || 0;
    
    if (isNaN(part) || isNaN(total)) {
      throw new Error('Inserisci valori numerici validi');
    }

    if (total === 0) {
      throw new Error('Il totale non può essere zero');
    }

    try {
      const percentage = (part / total) * 100;
      
      return {
        part,
        total,
        percentage: percentage.toFixed(2),
        formatted: `${percentage.toFixed(2)}%`,
        ratio: `${part}/${total}`,
        remaining: total - part,
        remainingPercent: ((total - part) / total * 100).toFixed(2),
      };
    } catch (error) {
      throw new Error(`Errore nel calcolo: ${error.message}`);
    }
  },
};


