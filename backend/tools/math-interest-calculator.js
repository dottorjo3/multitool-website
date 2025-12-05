// 🔧 File: backend/tools/math-interest-calculator.js
// 🔗 Calcola interessi semplici e composti

module.exports = {
  async run({ params }) {
    const principal = parseFloat(params.principal) || 0;
    const rate = parseFloat(params.rate) || 0;
    const years = parseFloat(params.years) || 0;
    const type = params.type || 'simple'; // 'simple', 'compound'
    
    if (isNaN(principal) || principal <= 0) {
      throw new Error('Inserisci un capitale valido');
    }

    if (isNaN(rate) || rate < 0) {
      throw new Error('Inserisci un tasso d\'interesse valido');
    }

    if (isNaN(years) || years <= 0) {
      throw new Error('Inserisci un numero di anni valido');
    }

    try {
      let total, interest;
      
      if (type === 'simple') {
        interest = principal * (rate / 100) * years;
        total = principal + interest;
      } else {
        // Compound interest
        total = principal * Math.pow(1 + rate / 100, years);
        interest = total - principal;
      }
      
      return {
        principal,
        rate,
        years,
        type,
        interest: interest.toFixed(2),
        total: total.toFixed(2),
        formula: type === 'simple' 
          ? `${principal} × ${rate}% × ${years} = ${interest.toFixed(2)}`
          : `${principal} × (1 + ${rate}%)^${years} = ${total.toFixed(2)}`,
      };
    } catch (error) {
      throw new Error(`Errore nel calcolo: ${error.message}`);
    }
  },
};


