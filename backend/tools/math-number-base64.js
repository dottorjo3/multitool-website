// 🔧 File: backend/tools/math-number-base64.js
// 🔗 Converti numero in base64 e viceversa

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const direction = params.direction || 'number-to-base64'; // 'number-to-base64', 'base64-to-number'
    
    if (!input) {
      throw new Error('Inserisci un numero o base64');
    }

    try {
      if (direction === 'number-to-base64') {
        const num = BigInt(input);
        const buffer = Buffer.from(num.toString(16), 'hex');
        const base64 = buffer.toString('base64');
        
        return {
          input,
          direction: 'number-to-base64',
          number: input,
          base64,
        };
      } else {
        const buffer = Buffer.from(input, 'base64');
        const number = BigInt('0x' + buffer.toString('hex')).toString();
        
        return {
          input,
          direction: 'base64-to-number',
          base64: input,
          number,
        };
      }
    } catch (error) {
      throw new Error(`Errore nella conversione: ${error.message}`);
    }
  },
};


