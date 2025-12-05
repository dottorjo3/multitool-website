// 🔧 File: backend/tools/data-csv-validator.js
// 🔗 Valida struttura CSV

const { parse } = require('csv-parse/sync');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const delimiter = params.delimiter || ',';
    const strictColumnCount = params.strictColumnCount === 'true';
    
    if (!input) {
      throw new Error('Inserisci del CSV da validare');
    }

    try {
      const lines = input.split(/\r?\n/).filter(l => l.trim().length > 0);
      
      if (lines.length === 0) {
        throw new Error('CSV vuoto');
      }
      
      const headers = lines[0].split(delimiter);
      const expectedColumnCount = headers.length;
      const errors = [];
      const warnings = [];
      
      // Valida ogni riga
      lines.slice(1).forEach((line, index) => {
        const columns = line.split(delimiter);
        if (strictColumnCount && columns.length !== expectedColumnCount) {
          errors.push(`Riga ${index + 2}: numero colonne errato (attese: ${expectedColumnCount}, trovate: ${columns.length})`);
        } else if (columns.length !== expectedColumnCount) {
          warnings.push(`Riga ${index + 2}: numero colonne diverso (attese: ${expectedColumnCount}, trovate: ${columns.length})`);
        }
      });
      
      // Prova parsing completo
      const records = parse(input, {
        columns: true,
        skip_empty_lines: true,
        delimiter,
        relax_column_count: !strictColumnCount,
      });
      
      const isValid = errors.length === 0;
      
      return {
        isValid,
        original: input,
        errors,
        warnings,
        errorCount: errors.length,
        warningCount: warnings.length,
        rows: records.length,
        columns: expectedColumnCount,
        headers,
      };
    } catch (error) {
      return {
        isValid: false,
        original: input,
        errors: [error.message],
        warnings: [],
        errorCount: 1,
        warningCount: 0,
      };
    }
  },
};


