// 🔧 File: backend/tools/text-strict-json-pretty.js
// 🔗 Formatta JSON con validazione rigorosa

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const indent = params.indent ? parseInt(params.indent, 10) : 2;
    
    if (!input) {
      throw new Error('Inserisci del JSON da formattare');
    }

    if (indent < 0 || indent > 10) {
      throw new Error('Indentazione deve essere tra 0 e 10');
    }

    try {
      // Parse rigoroso
      const parsed = JSON.parse(input);
      
      // Formatta con indentazione personalizzata
      const formatted = JSON.stringify(parsed, null, indent);
      
      // Valida che sia JSON valido
      JSON.parse(formatted); // Double check
      
      return {
        original: input,
        formatted,
        isValid: true,
        indent,
        length: formatted.length,
      };
    } catch (error) {
      throw new Error(`JSON non valido: ${error.message}`);
    }
  },
};

