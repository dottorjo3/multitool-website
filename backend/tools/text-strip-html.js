// 🔧 File: backend/tools/text-strip-html.js
// 🔗 Rimuove tag HTML da un testo

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    
    if (!input) {
      throw new Error('Inserisci il testo HTML da pulire');
    }

    // Rimuove tag HTML e decodifica entità HTML
    let cleaned = input.replace(/<[^>]*>/g, '');
    
    // Decodifica entità HTML comuni
    cleaned = cleaned
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'");
    
    // Decodifica entità numeriche
    cleaned = cleaned.replace(/&#(\d+);/g, (match, dec) => {
      return String.fromCharCode(parseInt(dec, 10));
    });
    
    // Decodifica entità esadecimali
    cleaned = cleaned.replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) => {
      return String.fromCharCode(parseInt(hex, 16));
    });
    
    // Normalizza spazi multipli
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    
    return {
      original: input,
      cleaned,
      originalLength: input.length,
      cleanedLength: cleaned.length,
      tagsRemoved: (input.match(/<[^>]*>/g) || []).length,
    };
  },
};

