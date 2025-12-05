// 🔧 File: backend/tools/text-csv-to-markdown-table.js
// 🔗 Converte CSV in tabella Markdown

const { parse } = require('csv-parse/sync');

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
      
      const headers = Object.keys(records[0]);
      const headerRow = `| ${headers.join(' | ')} |`;
      const separatorRow = `| ${headers.map(() => '---').join(' | ')} |`;
      
      const dataRows = records.map(record => {
        const values = headers.map(header => record[header] || '');
        return `| ${values.join(' | ')} |`;
      });
      
      const markdown = [headerRow, separatorRow, ...dataRows].join('\n');
      
      return {
        original: input,
        markdown,
        rows: records.length,
        columns: headers.length,
      };
    } catch (error) {
      throw new Error(`Errore durante il parsing CSV: ${error.message}`);
    }
  },
};

