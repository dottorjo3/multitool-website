// 🔧 File: backend/tools/text-ascii-text.js
// 🔗 Converte testo in arte ASCII

function textToASCII(text, font = 'standard') {
  // Font ASCII semplice (mappatura base)
  const fonts = {
    standard: {
      'A': '  A  \n A A \nAAAAA\nA   A\nA   A',
      'B': 'BBBB \nB   B\nBBBB \nB   B\nBBBB ',
      // ... altri caratteri
    }
  };
  
  // Per semplicità, usiamo una conversione base
  // In produzione, si potrebbe usare una libreria come figlet
  return text
    .split('')
    .map(char => {
      if (char === ' ') return '  ';
      if (/[A-Za-z0-9]/.test(char)) {
        // Converti in carattere ASCII stilizzato semplice
        return ` ${char.toUpperCase()} `;
      }
      return char;
    })
    .join('');
}

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const font = params.font || 'standard';
    
    if (!input) {
      throw new Error('Inserisci il testo da convertire');
    }

    // Per ora, creiamo una versione semplificata
    // In produzione si potrebbe integrare figlet o simile
    const ascii = input
      .split('\n')
      .map(line => {
        return line
          .split('')
          .map(char => {
            if (char === ' ') return ' ';
            if (/[A-Za-z]/.test(char)) {
              return `[${char.toUpperCase()}]`;
            }
            return char;
          })
          .join(' ');
      })
      .join('\n');
    
    return {
      original: input,
      ascii,
      font,
      length: input.length,
    };
  },
};

