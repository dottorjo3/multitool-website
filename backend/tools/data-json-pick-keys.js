// 🔧 File: backend/tools/data-json-pick-keys.js
// 🔗 Mantiene solo le chiavi specificate

function pickKeys(obj, keysToPick, recursive = false) {
  if (Array.isArray(obj)) {
    return obj.map(item => recursive ? pickKeys(item, keysToPick, recursive) : item);
  }
  
  if (obj !== null && typeof obj === 'object') {
    const picked = {};
    keysToPick.forEach(key => {
      if (key in obj) {
        picked[key] = recursive ? pickKeys(obj[key], keysToPick, recursive) : obj[key];
      }
    });
    return picked;
  }
  
  return obj;
}

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const keys = params.keys?.trim() || '';
    const recursive = params.recursive === 'true';
    
    if (!input) {
      throw new Error('Inserisci del JSON da modificare');
    }

    if (!keys) {
      throw new Error('Specifica le chiavi da mantenere (separate da virgola)');
    }

    try {
      const json = JSON.parse(input);
      const keysToPick = keys.split(',').map(k => k.trim()).filter(Boolean);
      const picked = pickKeys(json, keysToPick, recursive);
      
      return {
        original: input,
        picked: JSON.stringify(picked, null, 2),
        keysPicked: keysToPick,
        recursive,
      };
    } catch (error) {
      throw new Error(`Errore durante la selezione: ${error.message}`);
    }
  },
};


