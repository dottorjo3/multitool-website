// 🔧 File: backend/tools/math-time-zone-converter.js
// 🔗 Converti fuso orario

module.exports = {
  async run({ params }) {
    const dateTime = params.dateTime || '';
    const fromTZ = params.fromTZ || 'UTC';
    const toTZ = params.toTZ || 'Europe/Rome';
    
    if (!dateTime) {
      throw new Error('Inserisci una data/ora');
    }

    try {
      // Per semplicità, usa Date object base (in produzione usa date-fns-tz)
      const date = new Date(dateTime);
      
      if (isNaN(date.getTime())) {
        throw new Error('Formato data/ora non valido');
      }
      
      // Converti tra timezone (simplified - in produzione usa libreria completa)
      const utcDate = date.toISOString();
      const localDate = new Date(utcDate);
      
      return {
        original: dateTime,
        fromTZ,
        toTZ,
        converted: localDate.toISOString(),
        formatted: localDate.toLocaleString('it-IT', { 
          timeZone: toTZ,
          dateStyle: 'full',
          timeStyle: 'long',
        }),
        note: 'Conversione semplificata. Per precisione completa, configura date-fns-tz.',
      };
    } catch (error) {
      throw new Error(`Errore nella conversione: ${error.message}`);
    }
  },
};


