// 🔧 File: backend/tools/math-binary-operations.js
// 🔗 Operazioni binarie

module.exports = {
  async run({ params }) {
    const number1 = parseInt(params.number1, 10);
    const number2 = parseInt(params.number2, 10);
    const operation = params.operation || 'and'; // 'and', 'or', 'xor', 'not', 'shift-left', 'shift-right'
    
    if (isNaN(number1)) {
      throw new Error('Inserisci il primo numero');
    }

    if (operation !== 'not' && isNaN(number2)) {
      throw new Error('Inserisci il secondo numero');
    }

    try {
      let result;
      let formula;
      
      switch (operation) {
        case 'and':
          result = number1 & number2;
          formula = `${number1.toString(2)} AND ${number2.toString(2)} = ${result.toString(2)}`;
          break;
        
        case 'or':
          result = number1 | number2;
          formula = `${number1.toString(2)} OR ${number2.toString(2)} = ${result.toString(2)}`;
          break;
        
        case 'xor':
          result = number1 ^ number2;
          formula = `${number1.toString(2)} XOR ${number2.toString(2)} = ${result.toString(2)}`;
          break;
        
        case 'not':
          result = ~number1;
          formula = `NOT ${number1.toString(2)} = ${result.toString(2)}`;
          break;
        
        case 'shift-left':
          result = number1 << number2;
          formula = `${number1.toString(2)} << ${number2} = ${result.toString(2)}`;
          break;
        
        case 'shift-right':
          result = number1 >> number2;
          formula = `${number1.toString(2)} >> ${number2} = ${result.toString(2)}`;
          break;
        
        default:
          throw new Error('Operazione non valida');
      }
      
      return {
        number1,
        number2: operation !== 'not' ? number2 : null,
        operation,
        result,
        binary1: number1.toString(2),
        binary2: operation !== 'not' ? number2.toString(2) : null,
        resultBinary: result.toString(2),
        formula,
      };
    } catch (error) {
      throw new Error(`Errore nell'operazione: ${error.message}`);
    }
  },
};


