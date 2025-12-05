// 🔧 File: backend/tools/data-json-merge.js
// 🔗 Unisce più oggetti JSON

module.exports = {
  async run({ params }) {
    const json1 = params.json1?.trim() || '';
    const json2 = params.json2?.trim() || '';
    const mergeStrategy = params.mergeStrategy || 'deep'; // 'deep', 'shallow', 'replace'
    
    if (!json1 || !json2) {
      throw new Error('Inserisci entrambi gli oggetti JSON da unire');
    }

    try {
      const obj1 = JSON.parse(json1);
      const obj2 = JSON.parse(json2);
      
      let merged;
      
      if (mergeStrategy === 'deep') {
        // Merge profondo (ricorsivo)
        merged = deepMerge(obj1, obj2);
      } else if (mergeStrategy === 'replace') {
        // Replace: obj2 sovrascrive completamente
        merged = { ...obj1, ...obj2 };
      } else {
        // Shallow merge
        merged = Object.assign({}, obj1, obj2);
      }
      
      function deepMerge(target, source) {
        const output = { ...target };
        Object.keys(source).forEach(key => {
          if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            output[key] = deepMerge(target[key] || {}, source[key]);
          } else {
            output[key] = source[key];
          }
        });
        return output;
      }
      
      return {
        json1: json1,
        json2: json2,
        merged: JSON.stringify(merged, null, 2),
        mergeStrategy,
      };
    } catch (error) {
      throw new Error(`Errore durante l'unione: ${error.message}`);
    }
  },
};


