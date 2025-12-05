// 🔧 File: backend/tools/math-sequence-generator.js
// 🔗 Genera sequenze matematiche

module.exports = {
  async run({ params }) {
    const type = params.type || 'arithmetic'; // 'arithmetic', 'geometric', 'square', 'cube'
    const start = parseFloat(params.start) || 1;
    const count = parseInt(params.count, 10) || 10;
    const step = parseFloat(params.step) || 1;
    
    if (isNaN(start) || isNaN(count) || isNaN(step)) {
      throw new Error('Inserisci valori numerici validi');
    }

    if (count < 1 || count > 1000) {
      throw new Error('Il conteggio deve essere tra 1 e 1000');
    }

    try {
      const sequence = [];
      
      for (let i = 0; i < count; i++) {
        let value;
        
        switch (type) {
          case 'arithmetic':
            value = start + (i * step);
            break;
          
          case 'geometric':
            value = start * Math.pow(step, i);
            break;
          
          case 'square':
            value = Math.pow(start + i, 2);
            break;
          
          case 'cube':
            value = Math.pow(start + i, 3);
            break;
          
          default:
            throw new Error('Tipo sequenza non valido');
        }
        
        sequence.push(value);
      }
      
      return {
        type,
        start,
        count,
        step,
        sequence,
        first: sequence[0],
        last: sequence[sequence.length - 1],
        sum: sequence.reduce((a, b) => a + b, 0),
      };
    } catch (error) {
      throw new Error(`Errore nella generazione: ${error.message}`);
    }
  },
};


