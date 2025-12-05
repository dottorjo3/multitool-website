// 🔧 File: backend/tools/text-csv-to-json-schema.js
// 🔗 Converte CSV in JSON Schema

const { parse } = require('csv-parse/sync');

function inferType(value) {
  if (/^\d+$/.test(value)) return { type: 'integer' };
  if (/^\d+\.\d+$/.test(value)) return { type: 'number' };
  if (/^(true|false)$/i.test(value)) return { type: 'boolean' };
  return { type: 'string' };
}

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const separator = params.separator || ',';
    
    if (!input) {
      throw new Error('Inserisci il CSV da convertire');
    }

    try {
      const records = parse(input, {
        columns: true,
        skip_empty_lines: true,
        delimiter: separator,
      });
      
      if (records.length === 0) {
        throw new Error('Nessun record trovato nel CSV');
      }
      
      // Analizza il primo record per inferire i tipi
      const firstRecord = records[0];
      const properties = {};
      
      Object.keys(firstRecord).forEach(key => {
        properties[key] = inferType(firstRecord[key]);
      });
      
      const schema = {
        type: 'array',
        items: {
          type: 'object',
          properties,
        },
      };
      
      return {
        original: input,
        schema: JSON.stringify(schema, null, 2),
        records: records.length,
        properties: Object.keys(properties),
      };
    } catch (error) {
      throw new Error(`Errore durante il parsing CSV: ${error.message}`);
    }
  },
};

