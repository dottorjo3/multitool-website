// 🔧 File: backend/tools/data-csv-rename-columns.js
// 🔗 Rinomina colonne CSV

const { parse, stringify } = require('csv-parse/sync');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const mappings = params.mappings?.trim() || ''; // formato: old1:new1,old2:new2
    const delimiter = params.delimiter || ',';
    
    if (!input) {
      throw new Error('Inserisci del CSV da modificare');
    }

    if (!mappings) {
      throw new Error('Specifica i mapping (formato: vecchia:nuova,vecchia2:nuova2)');
    }

    try {
      const records = parse(input, {
        columns: true,
        skip_empty_lines: true,
        delimiter,
      });
      
      const renameMap = {};
      mappings.split(',').forEach(mapping => {
        const [oldName, newName] = mapping.split(':').map(s => s.trim());
        if (oldName && newName) {
          renameMap[oldName] = newName;
        }
      });
      
      const modified = records.map(row => {
        const newRow = {};
        Object.keys(row).forEach(key => {
          const newKey = renameMap[key] || key;
          newRow[newKey] = row[key];
        });
        return newRow;
      });
      
      const output = stringify(modified, {
        header: true,
        delimiter,
      });
      
      return {
        original: input,
        modified: output,
        mappings: renameMap,
        rows: modified.length,
      };
    } catch (error) {
      throw new Error(`Errore durante la rinomina: ${error.message}`);
    }
  },
};


