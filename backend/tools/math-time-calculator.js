// 🔧 File: backend/tools/math-time-calculator.js
// 🔗 Calcola operazioni con tempi

module.exports = {
  async run({ params }) {
    const time1 = params.time1 || '00:00:00';
    const time2 = params.time2 || '00:00:00';
    const operation = params.operation || 'add'; // 'add', 'subtract', 'difference'
    
    function parseTime(timeStr) {
      const parts = timeStr.split(':').map(p => parseInt(p, 10));
      if (parts.length === 2) {
        return parts[0] * 3600 + parts[1] * 60;
      } else if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
      }
      throw new Error('Formato tempo non valido (usa HH:MM o HH:MM:SS)');
    }
    
    function formatTime(seconds) {
      const hours = Math.floor(Math.abs(seconds) / 3600);
      const minutes = Math.floor((Math.abs(seconds) % 3600) / 60);
      const secs = Math.abs(seconds) % 60;
      const sign = seconds < 0 ? '-' : '';
      return `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    try {
      const sec1 = parseTime(time1);
      const sec2 = parseTime(time2);
      
      let result;
      let formula;
      
      switch (operation) {
        case 'add':
          result = sec1 + sec2;
          formula = `${time1} + ${time2} = ${formatTime(result)}`;
          break;
        
        case 'subtract':
          result = sec1 - sec2;
          formula = `${time1} - ${time2} = ${formatTime(result)}`;
          break;
        
        case 'difference':
          result = Math.abs(sec1 - sec2);
          formula = `Differenza tra ${time1} e ${time2} = ${formatTime(result)}`;
          break;
        
        default:
          throw new Error('Operazione non valida');
      }
      
      return {
        time1,
        time2,
        operation,
        result: formatTime(result),
        seconds: result,
        formula,
      };
    } catch (error) {
      throw new Error(`Errore nel calcolo: ${error.message}`);
    }
  },
};


