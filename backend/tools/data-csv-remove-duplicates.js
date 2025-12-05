// 🔧 File: backend/tools/data-csv-remove-duplicates.js
// 🔗 Rimuove righe duplicate dal CSV

const { parse, stringify } = require('csv-parse/sync');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const column = params.column || null; // Se specificato, considera solo questa colonna
    const delimiter = params.delimiter || ',';
    
    if (!input) {
      throw new Error('Inserisci del CSV da pulire');
    }

    try {
      const records = parse(input, {
        columns: true,
        skip_empty_lines: true,
        delimiter,
      });
      
      const seen = new Set();
      const unique = [];
      const duplicates = [];
      
      records.forEach((row, index) => {
        const key = column 
          ? (row[column] || '').toString()
          : JSON.stringify(row);
        
        if (!seen.has(key)) {
          seen.add(key);
          unique.push(row);
        } else {
          duplicates.push({ row: index + 2, data: row }); // +2 per header e 1-indexed
        }
      });
      
      const output = stringify(unique, {
        header: true,
        delimiter,
      });
      
      return {
        original: input,
        cleaned: output,
        originalRows: records.length,
        uniqueRows: unique.length,
        duplicatesRemoved: duplicates.length,
        duplicates,
      };
    } catch (error) {
      throw new Error(`Errore durante la rimozione duplicati: ${error.message}`);
    }
  },
};


