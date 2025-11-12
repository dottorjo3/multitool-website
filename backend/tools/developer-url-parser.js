// 🔧 File: backend/tools/developer-url-parser.js
// 🔗 Analizza un URL e ne restituisce le parti

const { URL } = require('url');

module.exports = {
  async run({ params }) {
    const input = params.url?.trim();
    if (!input) {
      throw new Error('Inserisci un URL da analizzare');
    }

    try {
      const parsed = new URL(input);
      const queryParams = {};
      parsed.searchParams.forEach((value, key) => {
        if (queryParams[key]) {
          const current = queryParams[key];
          queryParams[key] = Array.isArray(current) ? [...current, value] : [current, value];
        } else {
          queryParams[key] = value;
        }
      });

      return {
        href: parsed.href,
        protocol: parsed.protocol,
        username: parsed.username || null,
        password: parsed.password || null,
        host: parsed.host,
        hostname: parsed.hostname,
        port: parsed.port || null,
        pathname: parsed.pathname,
        search: parsed.search || null,
        hash: parsed.hash || null,
        origin: parsed.origin,
        queryParams,
      };
    } catch (error) {
      throw new Error(`URL non valido: ${error.message}`);
    }
  },
};


