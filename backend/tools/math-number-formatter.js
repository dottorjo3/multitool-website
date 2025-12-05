// 🔧 File: backend/tools/math-number-formatter.js
// 🔗 Formatta numeri in vari formati

module.exports = {
  async run({ params }) {
    const number = parseFloat(params.number) || 0;
    const format = params.format || 'standard'; // 'standard', 'currency', 'percentage', 'scientific'
    
    if (isNaN(number)) {
      throw new Error('Inserisci un numero valido');
    }

    try {
      let formatted;
      let locale = 'it-IT';
      
      switch (format) {
        case 'standard':
          formatted = number.toLocaleString(locale, { maximumFractionDigits: 2 });
          break;
        
        case 'currency':
          const currency = params.currency || 'EUR';
          formatted = number.toLocaleString(locale, { 
            style: 'currency', 
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          break;
        
        case 'percentage':
          formatted = (number * 100).toLocaleString(locale, { 
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) + '%';
          break;
        
        case 'scientific':
          formatted = number.toExponential(2);
          break;
        
        case 'compact':
          formatted = number.toLocaleString(locale, { 
            notation: 'compact',
            maximumFractionDigits: 2,
          });
          break;
        
        default:
          formatted = number.toString();
      }
      
      return {
        number,
        format,
        formatted,
        original: number.toString(),
      };
    } catch (error) {
      throw new Error(`Errore nella formattazione: ${error.message}`);
    }
  },
};


