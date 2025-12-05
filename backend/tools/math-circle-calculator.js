// 🔧 File: backend/tools/math-circle-calculator.js
// 🔗 Calcola area e circonferenza cerchio

module.exports = {
  async run({ params }) {
    const radius = parseFloat(params.radius) || 0;
    const calculate = params.calculate || 'both'; // 'area', 'circumference', 'both'
    
    if (isNaN(radius) || radius <= 0) {
      throw new Error('Inserisci un raggio valido (numero positivo)');
    }

    try {
      const area = Math.PI * radius * radius;
      const circumference = 2 * Math.PI * radius;
      const diameter = 2 * radius;
      
      const results = {};
      if (calculate === 'area' || calculate === 'both') {
        results.area = area.toFixed(4);
        results.areaFormula = `π × ${radius}² = ${results.area}`;
      }
      if (calculate === 'circumference' || calculate === 'both') {
        results.circumference = circumference.toFixed(4);
        results.circumferenceFormula = `2 × π × ${radius} = ${results.circumference}`;
      }
      
      return {
        radius,
        diameter: diameter.toFixed(4),
        ...results,
        pi: Math.PI.toFixed(10),
      };
    } catch (error) {
      throw new Error(`Errore nel calcolo: ${error.message}`);
    }
  },
};


