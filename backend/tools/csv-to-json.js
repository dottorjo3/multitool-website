// 🔧 File: backend/tools/csv-to-json.js
// 🔗 Farm Ready — Converte CSV in JSON con parsing base

function parseCsv(text, delimiter = ',') {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) {
    return [];
  }

  const headers = lines[0].split(delimiter).map((h) => h.trim());
  const rows = lines.slice(1);

  return rows.map((row) => {
    const values = row.split(delimiter);
    const entry = {};
    headers.forEach((header, index) => {
      entry[header || `column_${index + 1}`] = (values[index] || '').trim();
    });
    return entry;
  });
}

module.exports = {
  async run({ params }) {
    const csv = params?.csv || '';
    const delimiter = params?.delimiter || ',';

    const data = parseCsv(csv, delimiter);

    return {
      rows: data.length,
      columns: data.length ? Object.keys(data[0]).length : 0,
      json: JSON.stringify(data, null, params.pretty === 'true' ? 2 : undefined),
    };
  },
};


