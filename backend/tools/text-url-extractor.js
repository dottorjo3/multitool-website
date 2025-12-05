// 🔧 File: backend/tools/text-url-extractor.js
// 🔗 Variante: Estrae URL con più opzioni (solo domini, solo link, etc.)

const URL_FULL_REGEX = /https?:\/\/[^\s]+/gi;
const DOMAIN_REGEX = /\b(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}\b/gi;

module.exports = {
  async run({ params }) {
    const text = params.input?.trim() || '';
    const extractType = params.extractType || 'full'; // 'full', 'domains', 'all'
    
    if (!text) {
      throw new Error('Inserisci il testo da cui estrarre gli URL');
    }

    const results = {
      full: [],
      domains: [],
    };
    const seen = {
      full: new Set(),
      domains: new Set(),
    };
    let match;

    // Estrai URL completi
    while ((match = URL_FULL_REGEX.exec(text)) !== null) {
      const url = match[0];
      if (!seen.full.has(url.toLowerCase())) {
        seen.full.add(url.toLowerCase());
        results.full.push({
          url,
          position: match.index,
        });
      }
    }

    // Estrai solo domini
    while ((match = DOMAIN_REGEX.exec(text)) !== null) {
      const domain = match[0];
      // Escludi se è già in un URL completo
      const isInUrl = results.full.some(u => u.url.includes(domain));
      if (!isInUrl && !seen.domains.has(domain.toLowerCase())) {
        seen.domains.add(domain.toLowerCase());
        results.domains.push({
          domain,
          position: match.index,
        });
      }
    }

    let output;
    if (extractType === 'full') {
      output = {
        count: results.full.length,
        urls: results.full.map(u => u.url),
        urlsWithPosition: results.full,
      };
    } else if (extractType === 'domains') {
      output = {
        count: results.domains.length,
        domains: results.domains.map(d => d.domain),
        domainsWithPosition: results.domains,
      };
    } else {
      output = {
        fullUrls: {
          count: results.full.length,
          urls: results.full.map(u => u.url),
        },
        domains: {
          count: results.domains.length,
          domains: results.domains.map(d => d.domain),
        },
        total: results.full.length + results.domains.length,
      };
    }

    return output;
  },
};

