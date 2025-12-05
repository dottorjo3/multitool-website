// 🔧 File: backend/tools/math-triangle-calculator.js
// 🔗 Calcola area e perimetro triangolo

module.exports = {
  async run({ params }) {
    const type = params.type || 'area'; // 'area', 'perimeter', 'hypotenuse'
    const a = parseFloat(params.a) || 0;
    const b = parseFloat(params.b) || 0;
    const c = parseFloat(params.c) || 0;
    
    if (isNaN(a) || a <= 0) {
      throw new Error('Inserisci un valore valido per il lato a');
    }

    try {
      let result;
      let formula;
      
      if (type === 'area') {
        if (isNaN(b) || b <= 0) {
          throw new Error('Inserisci base e altezza validi');
        }
        result = (a * b) / 2;
        formula = `Area = (${a} × ${b}) / 2 = ${result}`;
      } else if (type === 'perimeter') {
        if (isNaN(b) || b <= 0 || isNaN(c) || c <= 0) {
          throw new Error('Inserisci tutti e tre i lati');
        }
        result = a + b + c;
        formula = `Perimetro = ${a} + ${b} + ${c} = ${result}`;
      } else if (type === 'hypotenuse') {
        if (isNaN(b) || b <= 0) {
          throw new Error('Inserisci entrambi i cateti');
        }
        result = Math.sqrt(a * a + b * b);
        formula = `Ipotenusa = √(${a}² + ${b}²) = ${result.toFixed(4)}`;
      } else {
        throw new Error('Tipo calcolo non valido');
      }
      
      return {
        type,
        a,
        b,
        c: type !== 'area' && type !== 'hypotenuse' ? c : null,
        result: result.toFixed(4),
        formula,
      };
    } catch (error) {
      throw new Error(`Errore nel calcolo: ${error.message}`);
    }
  },
};


