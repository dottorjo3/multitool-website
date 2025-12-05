// 🔧 File: backend/tools/data-csv-statistics.js
// 🔗 Calcola statistiche sul CSV

const { parse } = require('csv-parse/sync');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const delimiter = params.delimiter || ',';
    
    if (!input) {
      throw new Error('Inserisci del CSV da analizzare');
    }

    try {
      const records = parse(input, {
        columns: true,
        skip_empty_lines: true,
        delimiter,
      });
      
      if (records.length === 0) {
        throw new Error('CSV vuoto');
      }
      
      const headers = Object.keys(records[0]);
      const stats = {
        rows: records.length,
        columns: headers.length,
        columnNames: headers,
        columnStats: {},
      };
      
      // Statistiche per colonna
      headers.forEach(header => {
        const values = records.map(r => r[header]).filter(v => v && v.trim().length > 0);
        const numericValues = values.map(v => parseFloat(v)).filter(v => !isNaN(v));
        
        stats.columnStats[header] = {
          total: values.length,
          empty: records.length - values.length,
          numeric: numericValues.length,
        };
        
        if (numericValues.length > 0) {
          stats.columnStats[header].min = Math.min(...numericValues);
          stats.columnStats[header].max = Math.max(...numericValues);
          stats.columnStats[header].avg = (numericValues.reduce((a, b) => a + b, 0) / numericValues.length).toFixed(2);
        }
      });
      
      return {
        original: input,
        stats,
      };
    } catch (error) {
      throw new Error(`Errore durante l'analisi: ${error.message}`);
    }
  },
};


