// 🔧 File: backend/tools/text-extract-urls.js
// 🔗 Estrae URL da un testo

const URL_REGEX = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}\/[^\s]*)/gi;

module.exports = {
  async run({ params }) {
    const text = params.input?.trim() || '';
    
    if (!text) {
      throw new Error('Inserisci il testo da cui estrarre gli URL');
    }

    const urls = [];
    const seen = new Set();
    let match;

    while ((match = URL_REGEX.exec(text)) !== null) {
      let url = match[0];
      // Aggiungi http:// se manca il protocollo
      if (!url.startsWith('http')) {
        url = 'http://' + url;
      }
      
      if (!seen.has(url.toLowerCase())) {
        seen.add(url.toLowerCase());
        urls.push({
          url,
          position: match.index,
        });
      }
    }

    return {
      count: urls.length,
      urls: urls.map(u => u.url),
      urlsWithPosition: urls,
    };
  },
};

