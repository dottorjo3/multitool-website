// 🔧 File: backend/tools/text-strip-latex.js
// 🔗 Rimuove comandi LaTeX da un testo

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    
    if (!input) {
      throw new Error('Inserisci il testo LaTeX da pulire');
    }

    let cleaned = input;
    
    // Rimuove comandi LaTeX \command{...}
    cleaned = cleaned.replace(/\\[a-zA-Z]+\{([^}]*)\}/g, '$1');
    
    // Rimuove comandi senza argomenti \command
    cleaned = cleaned.replace(/\\[a-zA-Z]+/g, '');
    
    // Rimuove ambienti \begin{...}...\end{...}
    cleaned = cleaned.replace(/\\begin\{[^}]+\}[\s\S]*?\\end\{[^}]+\}/g, '');
    
    // Rimuove simboli matematici comuni
    cleaned = cleaned.replace(/\\[a-zA-Z]+/g, '');
    
    // Rimuove caratteri speciali LaTeX
    cleaned = cleaned.replace(/[{}]/g, '');
    cleaned = cleaned.replace(/\$[\s\S]*?\$/g, ''); // Math mode inline
    cleaned = cleaned.replace(/\\\[[\s\S]*?\\\]/g, ''); // Math display
    
    // Normalizza spazi
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    
    return {
      original: input,
      cleaned,
      originalLength: input.length,
      cleanedLength: cleaned.length,
    };
  },
};

