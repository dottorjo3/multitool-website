// 🔧 File: backend/tools/text-combine-files.js
// 🔗 Combina più testi in uno solo

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const separator = params.separator || '\n\n';
    const addNumbers = params.addNumbers === 'true';
    
    if (!input) {
      throw new Error('Inserisci i testi da combinare (separati da una riga vuota)');
    }

    // Divide per righe vuote multiple
    const texts = input
      .split(/\n\s*\n/)
      .map(t => t.trim())
      .filter(t => t.length > 0);
    
    if (texts.length === 0) {
      throw new Error('Nessun testo trovato da combinare');
    }

    const combined = texts.map((text, index) => {
      if (addNumbers) {
        return `--- Testo ${index + 1} ---\n${text}`;
      }
      return text;
    }).join(separator);
    
    return {
      original: input,
      combined,
      textsCount: texts.length,
      separator,
      addNumbers,
    };
  },
};

