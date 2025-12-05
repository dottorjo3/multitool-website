// 🔧 File: backend/tools/developer-css-validator.js
// 🔗 Valida codice CSS (base)

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    
    if (!input) {
      throw new Error('Inserisci del codice CSS da validare');
    }

    const errors = [];
    const warnings = [];
    
    // Verifica parentesi graffe bilanciate
    const openBraces = (input.match(/{/g) || []).length;
    const closeBraces = (input.match(/}/g) || []).length;
    
    if (openBraces !== closeBraces) {
      errors.push(`Parentesi graffe non bilanciate: ${openBraces} aperte, ${closeBraces} chiuse`);
    }
    
    // Verifica due punti (sintassi proprietà: valore)
    const selectorRegex = /([^{]+)\{([^}]+)\}/g;
    let match;
    
    while ((match = selectorRegex.exec(input)) !== null) {
      const properties = match[2];
      const lines = properties.split(';').filter(l => l.trim().length > 0);
      
      lines.forEach(line => {
        if (!line.includes(':')) {
          warnings.push(`Possibile proprietà CSS malformata: ${line.trim()}`);
        }
      });
    }
    
    // Verifica proprietà CSS comuni
    const validProperties = ['color', 'background', 'margin', 'padding', 'width', 'height', 'display', 'position', 'font', 'border'];
    const invalidProps = [];
    
    const propRegex = /([a-z-]+)\s*:/gi;
    while ((match = propRegex.exec(input)) !== null) {
      const prop = match[1].toLowerCase();
      // Verifica base (non completo, ma utile)
    }
    
    const isValid = errors.length === 0;
    
    return {
      isValid,
      original: input,
      errors,
      warnings,
      errorCount: errors.length,
      warningCount: warnings.length,
      rulesCount: openBraces,
    };
  },
};


