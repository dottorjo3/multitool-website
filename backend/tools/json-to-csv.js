// 🔧 File: backend/tools/json-to-csv.js
// 🔗 Farm Ready — Converte JSON array in CSV

function jsonToCsvArray(data, delimiter = ',') {
  if (!Array.isArray(data)) {
    throw new Error('Il JSON deve essere un array di oggetti');
  }
  if (data.length === 0) {
    return { headers: [], rows: [] };
  }

  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers
      .map((header) => {
        const value = row[header] ?? '';
        const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
        return stringValue.includes(delimiter) || stringValue.includes('"') || stringValue.includes('\n')
          ? `"${stringValue.replace(/"/g, '""')}"`
          : stringValue;
      })
      .join(delimiter),
  );

  return { headers, rows };
}

module.exports = {
  async run({ params }) {
    const input = params?.json || '';
    const delimiter = params?.delimiter || ',';

    let parsed;
    try {
      parsed = JSON.parse(input);
    } catch (error) {
      throw new Error(`JSON non valido: ${error.message}`);
    }

    const { headers, rows } = jsonToCsvArray(parsed, delimiter);
    const csv =
      headers.join(delimiter) + (rows.length ? `\n${rows.join('\n')}` : '');

    return {
      rows: rows.length,
      columns: headers.length,
      csv,
    };
  },
};


