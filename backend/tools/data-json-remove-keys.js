// 🔧 File: backend/tools/data-json-remove-keys.js
// 🔗 Rimuove chiavi specifiche da JSON

function removeKeys(obj, keysToRemove, recursive = true) {
  if (Array.isArray(obj)) {
    return obj.map(item => recursive ? removeKeys(item, keysToRemove, recursive) : item);
  }
  
  if (obj !== null && typeof obj === 'object') {
    const cleaned = {};
    Object.keys(obj).forEach(key => {
      if (!keysToRemove.includes(key)) {
        cleaned[key] = recursive ? removeKeys(obj[key], keysToRemove, recursive) : obj[key];
      }
    });
    return cleaned;
  }
  
  return obj;
}

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const keys = params.keys?.trim() || '';
    const recursive = params.recursive !== 'false';
    
    if (!input) {
      throw new Error('Inserisci del JSON da modificare');
    }

    if (!keys) {
      throw new Error('Specifica le chiavi da rimuovere (separate da virgola)');
    }

    try {
      const json = JSON.parse(input);
      const keysToRemove = keys.split(',').map(k => k.trim()).filter(Boolean);
      const cleaned = removeKeys(json, keysToRemove, recursive);
      
      return {
        original: input,
        cleaned: JSON.stringify(cleaned, null, 2),
        keysRemoved: keysToRemove,
        recursive,
      };
    } catch (error) {
      throw new Error(`Errore durante la rimozione: ${error.message}`);
    }
  },
};


