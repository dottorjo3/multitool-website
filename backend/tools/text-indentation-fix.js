// 🔧 File: backend/tools/text-indentation-fix.js
// 🔗 Normalizza l'indentazione del testo

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const indentType = params.indentType || 'spaces'; // 'spaces' o 'tabs'
    const indentSize = params.indentSize ? parseInt(params.indentSize, 10) : 2;
    
    if (!input) {
      throw new Error('Inserisci il testo da correggere');
    }

    const lines = input.split(/\r?\n/);
    const indentChar = indentType === 'tabs' ? '\t' : ' '.repeat(indentSize);
    
    // Trova il livello minimo di indentazione
    let minIndent = Infinity;
    lines.forEach(line => {
      if (line.trim().length > 0) {
        const match = line.match(/^(\s*)/);
        if (match) {
          const indent = indentType === 'tabs' 
            ? match[1].split('\t').length - 1
            : match[1].length;
          minIndent = Math.min(minIndent, indent);
        }
      }
    });
    
    // Normalizza l'indentazione
    const fixed = lines.map(line => {
      if (line.trim().length === 0) {
        return '';
      }
      
      const match = line.match(/^(\s*)(.*)$/);
      if (match) {
        const [, indent, content] = match;
        const currentIndent = indentType === 'tabs'
          ? indent.split('\t').length - 1
          : indent.length;
        
        const normalizedIndent = Math.max(0, currentIndent - minIndent);
        return indentChar.repeat(normalizedIndent) + content;
      }
      
      return line;
    }).join('\n');
    
    return {
      original: input,
      fixed,
      indentType,
      indentSize: indentType === 'tabs' ? 1 : indentSize,
    };
  },
};

