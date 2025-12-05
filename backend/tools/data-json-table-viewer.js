// 🔧 File: backend/tools/data-json-table-viewer.js
// 🔗 Visualizza JSON come tabella strutturata

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    
    if (!input) {
      throw new Error('Inserisci del JSON da visualizzare');
    }

    try {
      const json = JSON.parse(input);
      
      let tableData = [];
      let headers = [];
      
      if (Array.isArray(json)) {
        if (json.length > 0 && typeof json[0] === 'object') {
          headers = Object.keys(json[0]);
          tableData = json.map(row => headers.map(header => row[header] || ''));
        } else {
          // Array semplice
          headers = ['Value'];
          tableData = json.map(item => [item]);
        }
      } else if (typeof json === 'object' && json !== null) {
        // Oggetto semplice
        headers = ['Key', 'Value'];
        tableData = Object.entries(json).map(([key, value]) => [
          key,
          typeof value === 'object' ? JSON.stringify(value) : String(value)
        ]);
      } else {
        // Valore semplice
        headers = ['Value'];
        tableData = [[String(json)]];
      }
      
      return {
        original: input,
        headers,
        rows: tableData,
        rowCount: tableData.length,
        columnCount: headers.length,
        isArray: Array.isArray(json),
        formatted: JSON.stringify(json, null, 2),
      };
    } catch (error) {
      throw new Error(`Errore durante l'analisi: ${error.message}`);
    }
  },
};


