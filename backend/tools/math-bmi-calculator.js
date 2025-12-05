// 🔧 File: backend/tools/math-bmi-calculator.js
// 🔗 Calcola BMI (Body Mass Index)

module.exports = {
  async run({ params }) {
    const weight = parseFloat(params.weight) || 0;
    const height = parseFloat(params.height) || 0;
    const unit = params.unit || 'metric'; // 'metric', 'imperial'
    
    if (isNaN(weight) || weight <= 0) {
      throw new Error('Inserisci un peso valido');
    }

    if (isNaN(height) || height <= 0) {
      throw new Error('Inserisci un\'altezza valida');
    }

    try {
      let bmi;
      let weightKg, heightM;
      
      if (unit === 'metric') {
        weightKg = weight;
        heightM = height / 100; // cm to m
      } else {
        // Imperial: weight in pounds, height in feet and inches
        weightKg = weight * 0.453592; // lbs to kg
        heightM = height * 0.3048; // feet to m (simplified, assumes total feet)
      }
      
      bmi = weightKg / (heightM * heightM);
      
      let category;
      if (bmi < 18.5) category = 'Sottopeso';
      else if (bmi < 25) category = 'Normale';
      else if (bmi < 30) category = 'Sovrappeso';
      else category = 'Obeso';
      
      return {
        weight,
        height,
        unit,
        bmi: bmi.toFixed(2),
        category,
        weightKg: weightKg.toFixed(2),
        heightM: heightM.toFixed(2),
      };
    } catch (error) {
      throw new Error(`Errore nel calcolo: ${error.message}`);
    }
  },
};


