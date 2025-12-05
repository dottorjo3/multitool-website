// 🔧 File: backend/tools/math-age-calculator.js
// 🔗 Calcola età da data di nascita

const { differenceInYears, differenceInMonths, differenceInDays, format } = require('date-fns');
const { it } = require('date-fns/locale');

module.exports = {
  async run({ params }) {
    const birthDate = params.birthDate || '';
    const referenceDate = params.referenceDate || new Date().toISOString().split('T')[0];
    
    if (!birthDate) {
      throw new Error('Inserisci la data di nascita');
    }

    try {
      const birth = new Date(birthDate);
      const reference = new Date(referenceDate);
      
      if (isNaN(birth.getTime()) || isNaN(reference.getTime())) {
        throw new Error('Formato data non valido. Usa formato YYYY-MM-DD');
      }
      
      if (birth > reference) {
        throw new Error('La data di nascita non può essere nel futuro');
      }
      
      const years = differenceInYears(reference, birth);
      const months = differenceInMonths(reference, birth) % 12;
      const days = differenceInDays(reference, new Date(birth.getFullYear(), reference.getMonth(), reference.getDate()));
      const totalDays = differenceInDays(reference, birth);
      
      return {
        birthDate: format(birth, 'dd/MM/yyyy', { locale: it }),
        referenceDate: format(reference, 'dd/MM/yyyy', { locale: it }),
        age: {
          years,
          months,
          days,
          totalDays,
          formatted: `${years} anni, ${months} mesi, ${days} giorni`,
        },
      };
    } catch (error) {
      throw new Error(`Errore nel calcolo: ${error.message}`);
    }
  },
};


