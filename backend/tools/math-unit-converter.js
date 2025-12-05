// 🔧 File: backend/tools/math-unit-converter.js
// 🔗 Convertitore unità di misura

const math = require('mathjs');

module.exports = {
  async run({ params }) {
    const value = parseFloat(params.value) || 0;
    const fromUnit = params.fromUnit || '';
    const toUnit = params.toUnit || '';
    const category = params.category || 'length'; // length, weight, temperature, volume
    
    if (isNaN(value)) {
      throw new Error('Inserisci un valore numerico valido');
    }

    if (!fromUnit || !toUnit) {
      throw new Error('Specifica le unità di origine e destinazione');
    }

    try {
      let result;
      
      // Usa mathjs per conversioni
      if (category === 'temperature') {
        // Conversioni temperatura personalizzate
        if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
          result = (value * 9/5) + 32;
        } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
          result = (value - 32) * 5/9;
        } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
          result = value + 273.15;
        } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
          result = value - 273.15;
        } else if (fromUnit === fromUnit && toUnit === toUnit) {
          result = value; // Stessa unità
        } else {
          throw new Error('Conversione temperatura non supportata');
        }
      } else {
        // Usa mathjs per altre conversioni
        const converted = math.unit(value, fromUnit).to(toUnit);
        result = converted.value;
      }
      
      return {
        original: value,
        fromUnit,
        toUnit,
        result,
        formatted: result.toLocaleString('it-IT', { maximumFractionDigits: 6 }),
        category,
      };
    } catch (error) {
      throw new Error(`Errore nella conversione: ${error.message}`);
    }
  },
};


