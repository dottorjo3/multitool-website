// 🔧 File: backend/tools/text-strip-markdown.js
// 🔗 Rimuove sintassi Markdown da un testo

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    
    if (!input) {
      throw new Error('Inserisci il testo Markdown da pulire');
    }

    let cleaned = input;
    
    // Rimuove header (# ## ###)
    cleaned = cleaned.replace(/^#{1,6}\s+/gm, '');
    
    // Rimuove bold (**text** o __text__)
    cleaned = cleaned.replace(/\*\*([^*]+)\*\*/g, '$1');
    cleaned = cleaned.replace(/__([^_]+)__/g, '$1');
    
    // Rimuove italic (*text* o _text_)
    cleaned = cleaned.replace(/\*([^*]+)\*/g, '$1');
    cleaned = cleaned.replace(/_([^_]+)_/g, '$1');
    
    // Rimuove link [text](url)
    cleaned = cleaned.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
    
    // Rimuove immagini ![alt](url)
    cleaned = cleaned.replace(/!\[([^\]]*)\]\([^\)]+\)/g, '');
    
    // Rimuove code inline `code`
    cleaned = cleaned.replace(/`([^`]+)`/g, '$1');
    
    // Rimuove code blocks ```code```
    cleaned = cleaned.replace(/```[\s\S]*?```/g, '');
    
    // Rimuove liste (- * +)
    cleaned = cleaned.replace(/^[\s]*[-*+]\s+/gm, '');
    cleaned = cleaned.replace(/^\d+\.\s+/gm, '');
    
    // Rimuove blockquotes (>)
    cleaned = cleaned.replace(/^>\s+/gm, '');
    
    // Rimuove strikethrough (~~text~~)
    cleaned = cleaned.replace(/~~([^~]+)~~/g, '$1');
    
    // Normalizza spazi multipli
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n').trim();
    
    return {
      original: input,
      cleaned,
      originalLength: input.length,
      cleanedLength: cleaned.length,
    };
  },
};

