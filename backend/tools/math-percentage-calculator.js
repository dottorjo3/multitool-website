// 🔧 File: backend/tools/math-percentage-calculator.js
// 🔗 Calcolatore percentuali

module.exports = {
  async run({ params }) {
    const operation = params.operation || 'percent-of'; // 'percent-of', 'percent-change', 'percent-increase'
    const value1 = parseFloat(params.value1) || 0;
    const value2 = parseFloat(params.value2) || 0;
    
    if (isNaN(value1) || isNaN(value2)) {
      throw new Error('Inserisci valori numerici validi');
    }

    let result;
    let formula;
    
    switch (operation) {
      case 'percent-of':
        // X percento di Y
        result = (value1 / 100) * value2;
        formula = `${value1}% di ${value2} = ${result}`;
        break;
      
      case 'percent-change':
        // Percentuale di variazione
        if (value2 === 0) {
          throw new Error('Il valore originale non può essere zero');
        }
        result = ((value1 - value2) / value2) * 100;
        formula = `Variazione da ${value2} a ${value1} = ${result.toFixed(2)}%`;
        break;
      
      case 'percent-increase':
        // Aumento percentuale
        result = value1 + (value1 * value2 / 100);
        formula = `${value1} aumentato del ${value2}% = ${result}`;
        break;
      
      case 'percent-decrease':
        // Diminuzione percentuale
        result = value1 - (value1 * value2 / 100);
        formula = `${value1} diminuito del ${value2}% = ${result}`;
        break;
      
      default:
        throw new Error('Operazione non valida');
    }
    
    return {
      operation,
      value1,
      value2,
      result,
      formatted: result.toLocaleString('it-IT', { maximumFractionDigits: 2 }),
      formula,
    };
  },
};


