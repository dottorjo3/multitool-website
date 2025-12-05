// 🔧 File: backend/tools/data-json-transform.js
// 🔗 Trasforma struttura JSON (base)

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const transformType = params.transformType || 'reverse-array'; // 'reverse-array', 'uppercase-keys', etc.
    
    if (!input) {
      throw new Error('Inserisci del JSON da trasformare');
    }

    try {
      const json = JSON.parse(input);
      let transformed;
      
      switch (transformType) {
        case 'reverse-array':
          if (Array.isArray(json)) {
            transformed = [...json].reverse();
          } else {
            throw new Error('JSON deve essere un array per questa trasformazione');
          }
          break;
        
        case 'uppercase-keys':
          transformed = transformKeys(json, key => key.toUpperCase());
          break;
        
        case 'lowercase-keys':
          transformed = transformKeys(json, key => key.toLowerCase());
          break;
        
        default:
          transformed = json;
      }
      
      function transformKeys(obj, transformFn) {
        if (Array.isArray(obj)) {
          return obj.map(item => transformKeys(item, transformFn));
        }
        if (obj !== null && typeof obj === 'object') {
          const result = {};
          Object.keys(obj).forEach(key => {
            result[transformFn(key)] = transformKeys(obj[key], transformFn);
          });
          return result;
        }
        return obj;
      }
      
      return {
        original: input,
        transformed: JSON.stringify(transformed, null, 2),
        transformType,
      };
    } catch (error) {
      throw new Error(`Errore durante la trasformazione: ${error.message}`);
    }
  },
};


