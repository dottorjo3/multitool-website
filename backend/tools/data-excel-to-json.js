// 🔧 File: backend/tools/data-excel-to-json.js
// 🔗 Converte Excel a JSON (richiede upload file)

const XLSX = require('xlsx');

module.exports = {
  async run({ params, file }) {
    if (!file || !file.path) {
      throw new Error('Carica un file Excel (.xlsx, .xls)');
    }

    try {
      const workbook = XLSX.readFile(file.path);
      const sheetName = params.sheetName || workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      
      if (!worksheet) {
        throw new Error(`Foglio "${sheetName}" non trovato`);
      }
      
      const json = XLSX.utils.sheet_to_json(worksheet, {
        raw: params.raw === 'true',
        defval: params.defval || null,
      });
      
      return {
        fileName: file.originalname,
        sheetName,
        availableSheets: workbook.SheetNames,
        json: JSON.stringify(json, null, 2),
        rows: json.length,
        columns: json.length > 0 ? Object.keys(json[0]).length : 0,
      };
    } catch (error) {
      throw new Error(`Errore durante la conversione Excel: ${error.message}`);
    }
  },
};


