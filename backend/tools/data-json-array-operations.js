// 🔧 File: backend/tools/data-json-array-operations.js
// 🔗 Operazioni su array JSON (unique, shuffle, slice, etc.)

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const operation = params.operation || 'unique';
    
    if (!input) {
      throw new Error('Inserisci un array JSON');
    }

    try {
      const json = JSON.parse(input);
      
      if (!Array.isArray(json)) {
        throw new Error('Il JSON deve essere un array');
      }
      
      let result;
      
      switch (operation) {
        case 'unique':
          // Rimuove duplicati
          result = Array.from(new Set(json.map(JSON.stringify))).map(JSON.parse);
          break;
        
        case 'shuffle':
          // Mescola array
          result = [...json].sort(() => Math.random() - 0.5);
          break;
        
        case 'reverse':
          // Inverte ordine
          result = [...json].reverse();
          break;
        
        case 'slice':
          const start = params.start ? parseInt(params.start, 10) : 0;
          const end = params.end ? parseInt(params.end, 10) : json.length;
          result = json.slice(start, end);
          break;
        
        case 'first':
          const n = params.n ? parseInt(params.n, 10) : 5;
          result = json.slice(0, n);
          break;
        
        case 'last':
          const m = params.n ? parseInt(params.n, 10) : 5;
          result = json.slice(-m);
          break;
        
        default:
          result = json;
      }
      
      return {
        original: input,
        operation,
        result: JSON.stringify(result, null, 2),
        originalLength: json.length,
        resultLength: result.length,
      };
    } catch (error) {
      throw new Error(`Errore durante l'operazione: ${error.message}`);
    }
  },
};


