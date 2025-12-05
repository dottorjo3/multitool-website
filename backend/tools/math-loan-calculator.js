// 🔧 File: backend/tools/math-loan-calculator.js
// 🔗 Calcola rate prestito

module.exports = {
  async run({ params }) {
    const principal = parseFloat(params.principal) || 0;
    const rate = parseFloat(params.rate) || 0;
    const years = parseFloat(params.years) || 0;
    
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
      const monthlyRate = rate / 100 / 12;
      const numPayments = years * 12;
      
      let monthlyPayment;
      if (rate === 0) {
        monthlyPayment = principal / numPayments;
      } else {
        monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                        (Math.pow(1 + monthlyRate, numPayments) - 1);
      }
      
      const totalPayment = monthlyPayment * numPayments;
      const totalInterest = totalPayment - principal;
      
      return {
        principal,
        rate,
        years,
        monthlyPayment: monthlyPayment.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        numPayments,
      };
    } catch (error) {
      throw new Error(`Errore nel calcolo: ${error.message}`);
    }
  },
};


