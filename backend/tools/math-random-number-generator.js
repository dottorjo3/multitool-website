// 🔧 File: backend/tools/math-random-number-generator.js
// 🔗 Genera numeri casuali

const crypto = require('crypto');

module.exports = {
  async run({ params }) {
    const min = parseFloat(params.min) || 0;
    const max = parseFloat(params.max) || 100;
    const count = parseInt(params.count, 10) || 1;
    const integer = params.integer !== 'false';
    
    if (isNaN(min) || isNaN(max)) {
      throw new Error('Inserisci valori min e max validi');
    }

    if (min >= max) {
      throw new Error('Il valore minimo deve essere inferiore al massimo');
    }

    if (count < 1 || count > 1000) {
      throw new Error('Il conteggio deve essere tra 1 e 1000');
    }

    try {
      const numbers = [];
      
      for (let i = 0; i < count; i++) {
        // Usa crypto per numeri casuali sicuri
        const randomBuffer = crypto.randomBytes(4);
        const randomValue = randomBuffer.readUInt32BE(0) / 0xFFFFFFFF;
        
        let num;
        if (integer) {
          num = Math.floor(randomValue * (max - min + 1)) + min;
        } else {
          num = randomValue * (max - min) + min;
        }
        
        numbers.push(num);
      }
      
      return {
        min,
        max,
        count,
        integer,
        numbers,
        formatted: numbers.map(n => 
          integer ? n.toString() : n.toLocaleString('it-IT', { maximumFractionDigits: 6 })
        ),
      };
    } catch (error) {
      throw new Error(`Errore nella generazione: ${error.message}`);
    }
  },
};


