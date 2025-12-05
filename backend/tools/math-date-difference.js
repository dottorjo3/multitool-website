// 🔧 File: backend/tools/math-date-difference.js
// 🔗 Calcola differenza tra date

const { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, format } = require('date-fns');
const { it } = require('date-fns/locale');

module.exports = {
  async run({ params }) {
    const date1 = params.date1 || '';
    const date2 = params.date2 || '';
    
    if (!date1 || !date2) {
      throw new Error('Inserisci entrambe le date');
    }

    try {
      const d1 = new Date(date1);
      const d2 = new Date(date2);
      
      if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
        throw new Error('Formato data non valido. Usa formato ISO (YYYY-MM-DD) o completo');
      }
      
      const days = Math.abs(differenceInDays(d2, d1));
      const hours = Math.abs(differenceInHours(d2, d1));
      const minutes = Math.abs(differenceInMinutes(d2, d1));
      const seconds = Math.abs(differenceInSeconds(d2, d1));
      
      return {
        date1: format(d1, 'dd/MM/yyyy HH:mm:ss', { locale: it }),
        date2: format(d2, 'dd/MM/yyyy HH:mm:ss', { locale: it }),
        difference: {
          days,
          hours,
          minutes,
          seconds,
          formatted: `${days} giorni, ${hours % 24} ore, ${minutes % 60} minuti`,
        },
        isFuture: d2 > d1,
      };
    } catch (error) {
      throw new Error(`Errore nel calcolo: ${error.message}`);
    }
  },
};


