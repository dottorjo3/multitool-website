// 🔧 File: backend/tools/math-quadratic-equation.js
// 🔗 Risolve equazione quadratica

module.exports = {
  async run({ params }) {
    const a = parseFloat(params.a) || 0;
    const b = parseFloat(params.b) || 0;
    const c = parseFloat(params.c) || 0;
    
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      throw new Error('Inserisci coefficienti validi (a, b, c)');
    }

    if (a === 0) {
      throw new Error('Il coefficiente "a" non può essere zero (non è un\'equazione quadratica)');
    }

    try {
      const discriminant = b * b - 4 * a * c;
      
      let x1, x2, solutions;
      
      if (discriminant > 0) {
        x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        solutions = [x1, x2];
      } else if (discriminant === 0) {
        x1 = -b / (2 * a);
        solutions = [x1];
      } else {
        const realPart = -b / (2 * a);
        const imaginaryPart = Math.sqrt(-discriminant) / (2 * a);
        solutions = [`${realPart} + ${imaginaryPart}i`, `${realPart} - ${imaginaryPart}i`];
      }
      
      return {
        a,
        b,
        c,
        discriminant,
        solutions,
        solutionCount: discriminant >= 0 ? (discriminant === 0 ? 1 : 2) : 2,
        equation: `${a}x² + ${b}x + ${c} = 0`,
      };
    } catch (error) {
      throw new Error(`Errore nel calcolo: ${error.message}`);
    }
  },
};


