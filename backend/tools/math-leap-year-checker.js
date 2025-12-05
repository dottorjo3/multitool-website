// 🔧 File: backend/tools/math-leap-year-checker.js
// 🔗 Verifica se un anno è bisestile

function isLeapYear(year) {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  if (year % 4 === 0) return true;
  return false;
}

module.exports = {
  async run({ params }) {
    const year = parseInt(params.year, 10) || 0;
    
    if (isNaN(year) || year < 1) {
      throw new Error('Inserisci un anno valido (numero positivo)');
    }

    try {
      const isLeap = isLeapYear(year);
      const daysInYear = isLeap ? 366 : 365;
      
      return {
        year,
        isLeapYear: isLeap,
        daysInYear,
        message: isLeap 
          ? `${year} è un anno bisestile (366 giorni)`
          : `${year} non è un anno bisestile (365 giorni)`,
        nextLeapYear: (() => {
          let next = year + 1;
          while (!isLeapYear(next)) next++;
          return next;
        })(),
      };
    } catch (error) {
      throw new Error(`Errore nella verifica: ${error.message}`);
    }
  },
};


