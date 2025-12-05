// 🔧 File: backend/tools/text-fake-csv.js
// 🔗 Genera CSV falso/di esempio

function generateFakeCSV(rows = 5, columns = 3, headers = true) {
  const randomString = () => Math.random().toString(36).substring(2, 8);
  const randomNumber = () => Math.floor(Math.random() * 1000);
  const randomDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 365));
    return date.toISOString().split('T')[0];
  };
  
  const csv = [];
  
  if (headers) {
    const headerRow = Array.from({ length: columns }, (_, i) => `Column${i + 1}`);
    csv.push(headerRow.join(','));
  }
  
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < columns; j++) {
      const valueType = Math.floor(Math.random() * 3);
      let value;
      switch (valueType) {
        case 0:
          value = randomString();
          break;
        case 1:
          value = randomNumber();
          break;
        case 2:
          value = randomDate();
          break;
        default:
          value = randomString();
      }
      row.push(value);
    }
    csv.push(row.join(','));
  }
  
  return csv.join('\n');
}

module.exports = {
  async run({ params }) {
    const rows = params.rows ? parseInt(params.rows, 10) : 5;
    const columns = params.columns ? parseInt(params.columns, 10) : 3;
    const headers = params.headers !== 'false';
    
    if (rows < 1 || rows > 1000) {
      throw new Error('Il numero di righe deve essere tra 1 e 1000');
    }
    if (columns < 1 || columns > 50) {
      throw new Error('Il numero di colonne deve essere tra 1 e 50');
    }

    const csv = generateFakeCSV(rows, columns, headers);
    
    return {
      csv,
      rows,
      columns,
      headers,
      length: csv.length,
    };
  },
};

