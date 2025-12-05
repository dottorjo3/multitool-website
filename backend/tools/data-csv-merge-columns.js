// 🔧 File: backend/tools/data-csv-merge-columns.js
// 🔗 Unisce più colonne CSV in una

const { parse, stringify } = require('csv-parse/sync');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const columns = params.columns?.trim() || '';
    const newColumnName = params.newColumnName || 'merged';
    const separator = params.separator || ' ';
    const delimiter = params.delimiter || ',';
    
    if (!input) {
      throw new Error('Inserisci del CSV da modificare');
    }

    if (!columns) {
      throw new Error('Specifica le colonne da unire (separate da virgola)');
    }

    try {
      const records = parse(input, {
        columns: true,
        skip_empty_lines: true,
        delimiter,
      });
      
      const columnsToMerge = columns.split(',').map(c => c.trim()).filter(Boolean);
      
      const modified = records.map(row => {
        const mergedValue = columnsToMerge.map(col => row[col] || '').join(separator);
        const newRow = { ...row, [newColumnName]: mergedValue };
        // Rimuovi le colonne originali se richiesto
        if (params.removeOriginal === 'true') {
          columnsToMerge.forEach(col => delete newRow[col]);
        }
        return newRow;
      });
      
      const output = stringify(modified, {
        header: true,
        delimiter,
      });
      
      return {
        original: input,
        modified: output,
        columnsMerged: columnsToMerge,
        newColumnName,
        separator,
        rows: modified.length,
      };
    } catch (error) {
      throw new Error(`Errore durante l'unione colonne: ${error.message}`);
    }
  },
};


