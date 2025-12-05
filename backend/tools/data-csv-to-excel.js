// 🔧 File: backend/tools/data-csv-to-excel.js
// 🔗 Converte CSV a Excel (output come JSON per ora, può essere esteso per file)

const { parse } = require('csv-parse/sync');
const XLSX = require('xlsx');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const sheetName = params.sheetName || 'Sheet1';
    const delimiter = params.delimiter || ',';
    
    if (!input) {
      throw new Error('Inserisci del CSV da convertire');
    }

    try {
      const records = parse(input, {
        columns: true,
        skip_empty_lines: true,
        delimiter,
      });
      
      // Converte a formato Excel (per ora restituisce JSON, può essere esteso per generare file)
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(records);
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      
      // Per ora restituiamo i dati, può essere esteso per generare file .xlsx
      const excelData = XLSX.utils.sheet_to_json(worksheet);
      
      return {
        original: input,
        excelData: JSON.stringify(excelData, null, 2),
        sheetName,
        rows: records.length,
        columns: records.length > 0 ? Object.keys(records[0]).length : 0,
        note: 'Dati convertiti (estensione futura: generazione file .xlsx)',
      };
    } catch (error) {
      throw new Error(`Errore durante la conversione: ${error.message}`);
    }
  },
};


