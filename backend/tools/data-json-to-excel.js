// 🔧 File: backend/tools/data-json-to-excel.js
// 🔗 Converte JSON a Excel (output come dati strutturati)

const XLSX = require('xlsx');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const sheetName = params.sheetName || 'Sheet1';
    
    if (!input) {
      throw new Error('Inserisci del JSON da convertire');
    }

    try {
      const json = JSON.parse(input);
      
      let data = json;
      if (!Array.isArray(json)) {
        // Se non è array, crea array con un elemento
        data = [json];
      }
      
      // Converte a formato Excel
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      
      // Per ora restituiamo i dati strutturati
      const excelData = XLSX.utils.sheet_to_json(worksheet);
      
      return {
        original: input,
        excelData: JSON.stringify(excelData, null, 2),
        sheetName,
        rows: data.length,
        columns: data.length > 0 ? Object.keys(data[0]).length : 0,
        note: 'Dati convertiti (estensione futura: generazione file .xlsx)',
      };
    } catch (error) {
      throw new Error(`Errore durante la conversione: ${error.message}`);
    }
  },
};


