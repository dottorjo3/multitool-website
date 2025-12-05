// 🔧 File: backend/tools/developer-html-validator.js
// 🔗 Valida codice HTML (base)

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    
    if (!input) {
      throw new Error('Inserisci del codice HTML da validare');
    }

    const errors = [];
    const warnings = [];
    
    // Verifica tag non chiusi
    const openTags = [];
    const tagRegex = /<\/?([a-z][a-z0-9]*)[^>]*>/gi;
    let match;
    
    while ((match = tagRegex.exec(input)) !== null) {
      const tag = match[1].toLowerCase();
      const isClosing = match[0].startsWith('</');
      
      if (isClosing) {
        if (openTags.length === 0 || openTags[openTags.length - 1] !== tag) {
          warnings.push(`Tag di chiusura </${tag}> senza apertura corrispondente`);
        } else {
          openTags.pop();
        }
      } else {
        // Verifica se è self-closing
        if (!match[0].endsWith('/>') && !['img', 'br', 'hr', 'input', 'meta', 'link'].includes(tag)) {
          openTags.push(tag);
        }
      }
    }
    
    if (openTags.length > 0) {
      errors.push(`Tag non chiusi: ${openTags.join(', ')}`);
    }
    
    // Verifica attributi HTML base
    if (input.includes('href="') && !input.includes('http') && !input.includes('#')) {
      warnings.push('Possibile link relativo senza base URL');
    }
    
    const isValid = errors.length === 0;
    
    return {
      isValid,
      original: input,
      errors,
      warnings,
      errorCount: errors.length,
      warningCount: warnings.length,
      openTagsCount: openTags.length,
    };
  },
};


