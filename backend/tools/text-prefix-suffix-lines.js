// 🔧 File: backend/tools/text-prefix-suffix-lines.js
// 🔗 Aggiunge prefisso/suffisso a ogni riga

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const prefix = params.prefix || '';
    const suffix = params.suffix || '';
    const skipEmpty = params.skipEmpty === 'true';
    
    if (!input) {
      throw new Error('Inserisci il testo da modificare');
    }

    const lines = input.split(/\r?\n/);
    const modified = lines.map(line => {
      if (skipEmpty && line.trim().length === 0) {
        return line;
      }
      return prefix + line + suffix;
    }).join('\n');
    
    return {
      original: input,
      modified,
      linesProcessed: lines.length,
      prefix,
      suffix,
    };
  },
};

