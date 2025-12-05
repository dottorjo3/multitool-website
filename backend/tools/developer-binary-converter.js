// 🔧 File: backend/tools/developer-binary-converter.js
// 🔗 Converte tra binario, ottale, esadecimale, decimale

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const fromBase = params.fromBase ? parseInt(params.fromBase, 10) : 10;
    const toBase = params.toBase ? parseInt(params.toBase, 10) : 2;
    
    if (!input) {
      throw new Error('Inserisci un numero da convertire');
    }

    if (fromBase < 2 || fromBase > 36 || toBase < 2 || toBase > 36) {
      throw new Error('Le basi devono essere tra 2 e 36');
    }

    try {
      // Converte da base source a decimale
      const decimal = parseInt(input, fromBase);
      
      if (isNaN(decimal)) {
        throw new Error(`Il numero "${input}" non è valido per la base ${fromBase}`);
      }
      
      // Converte da decimale a base target
      const converted = decimal.toString(toBase);
      
      return {
        input,
        fromBase,
        toBase,
        decimal: decimal.toString(10),
        converted,
        binary: decimal.toString(2),
        octal: decimal.toString(8),
        hex: decimal.toString(16).toUpperCase(),
      };
    } catch (error) {
      throw new Error(`Errore durante la conversione: ${error.message}`);
    }
  },
};


