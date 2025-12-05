// 🔧 File: backend/tools/data-excel-to-csv.js
// 🔗 Converte Excel a CSV (richiede upload file)

const XLSX = require('xlsx');
const { stringify } = require('csv-stringify/sync');

module.exports = {
  async run({ params, file }) {
    if (!file || !file.path) {
      throw new Error('Carica un file Excel (.xlsx, .xls)');
    }

    try {
      const workbook = XLSX.readFile(file.path);
      const sheetName = params.sheetName || workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const delimiter = params.delimiter || ',';
      
      if (!worksheet) {
        throw new Error(`Foglio "${sheetName}" non trovato`);
      }
      
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
      
      const csv = stringify(json, {
        delimiter,
      });
      
      return {
        fileName: file.originalname,
        sheetName,
        csv,
        rows: json.length,
        columns: json.length > 0 ? json[0].length : 0,
      };
    } catch (error) {
      throw new Error(`Errore durante la conversione: ${error.message}`);
    }
  },
};


