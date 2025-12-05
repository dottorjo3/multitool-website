// 🔧 File: backend/tools/data-json-compare.js
// 🔗 Confronta due JSON e mostra differenze

const { diff } = require('json-diff');

module.exports = {
  async run({ params }) {
    const json1 = params.json1?.trim() || '';
    const json2 = params.json2?.trim() || '';
    
    if (!json1 || !json2) {
      throw new Error('Inserisci entrambi i JSON da confrontare');
    }

    try {
      const obj1 = JSON.parse(json1);
      const obj2 = JSON.parse(json2);
      
      const differences = diff(obj1, obj2);
      const hasDifferences = differences && Object.keys(differences).length > 0;
      
      return {
        json1: json1,
        json2: json2,
        differences: JSON.stringify(differences, null, 2),
        hasDifferences,
        isEqual: !hasDifferences,
      };
    } catch (error) {
      throw new Error(`Errore durante il confronto: ${error.message}`);
    }
  },
};


