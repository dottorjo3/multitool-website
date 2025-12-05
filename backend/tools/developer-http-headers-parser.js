// 🔧 File: backend/tools/developer-http-headers-parser.js
// 🔗 Analizza HTTP headers

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    
    if (!input) {
      throw new Error('Inserisci gli HTTP headers da analizzare');
    }

    const headers = {};
    const lines = input.split(/\r?\n/);
    let statusLine = null;
    
    lines.forEach((line, index) => {
      if (index === 0 && line.match(/^(HTTP\/|GET |POST |PUT |DELETE |PATCH |HEAD |OPTIONS )/i)) {
        statusLine = line;
        return;
      }
      
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();
        headers[key.toLowerCase()] = value;
      }
    });
    
    return {
      original: input,
      statusLine,
      headers,
      headerCount: Object.keys(headers).length,
      parsed: true,
    };
  },
};


