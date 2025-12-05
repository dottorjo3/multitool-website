// 🔧 File: backend/tools/data-json-sort-keys.js
// 🔗 Ordina chiavi JSON

function sortKeys(obj, recursive = true) {
  if (Array.isArray(obj)) {
    return obj.map(item => recursive ? sortKeys(item, recursive) : item);
  }
  
  if (obj !== null && typeof obj === 'object') {
    const sorted = {};
    Object.keys(obj).sort().forEach(key => {
      sorted[key] = recursive ? sortKeys(obj[key], recursive) : obj[key];
    });
    return sorted;
  }
  
  return obj;
}

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const recursive = params.recursive !== 'false';
    
    if (!input) {
      throw new Error('Inserisci del JSON da ordinare');
    }

    try {
      const json = JSON.parse(input);
      const sorted = sortKeys(json, recursive);
      
      return {
        original: input,
        sorted: JSON.stringify(sorted, null, 2),
        recursive,
      };
    } catch (error) {
      throw new Error(`Errore durante l'ordinamento: ${error.message}`);
    }
  },
};


