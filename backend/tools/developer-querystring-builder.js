// 🔧 File: backend/tools/developer-querystring-builder.js
// 🔗 Costruisce query string da coppie chiave/valore

const { URLSearchParams } = require('url');

function parseLines(lines, delimiter) {
  const result = [];
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    const parts = trimmed.split(delimiter);
    if (parts.length < 2) {
      throw new Error(`Riga ${index + 1}: formato non valido (usa "${delimiter}")`);
    }
    const key = parts.shift().trim();
    const value = parts.join(delimiter).trim();
    if (!key) {
      throw new Error(`Riga ${index + 1}: chiave vuota`);
    }
    result.push({ key, value });
  });
  return result;
}

module.exports = {
  async run({ params }) {
    const input = params.lines ?? '';
    if (!input.trim()) {
      throw new Error('Inserisci almeno una coppia chiave/valore');
    }

    const delimiter = params.delimiter || '=';
    const encode = params.encode !== 'false';

    const lines = input.split(/\r?\n/);
    const pairs = parseLines(lines, delimiter);

    const searchParams = new URLSearchParams();
    pairs.forEach(({ key, value }) => {
      searchParams.append(key, value);
    });

    const queryString = encode ? searchParams.toString() : pairs.map(({ key, value }) => `${key}=${value}`).join('&');

    return {
      pairs,
      queryString,
      fullUrl: params.baseUrl ? `${params.baseUrl}${params.baseUrl.includes('?') ? '&' : '?'}${queryString}` : null,
    };
  },
};



