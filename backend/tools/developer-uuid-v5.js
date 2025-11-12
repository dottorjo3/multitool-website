// 🔧 File: backend/tools/developer-uuid-v5.js
// 🔗 Genera UUID v5 (namespace + name)

const { v5: uuidv5 } = require('uuid');

const NAMESPACES = {
  dns: uuidv5.DNS,
  url: uuidv5.URL,
};

module.exports = {
  async run({ params }) {
    const namespace = (params.namespace || 'dns').toLowerCase();
    const name = params.name?.trim();

    if (!name) {
      throw new Error('Inserisci il valore da hashare nel namespace');
    }

    let nsValue = params.customNamespace?.trim();
    if (!nsValue) {
      nsValue = NAMESPACES[namespace];
    }

    if (!nsValue) {
      throw new Error('Namespace non valido o mancante');
    }

    try {
      const uuid = uuidv5(name, nsValue);
      return {
        version: 'v5',
        namespace: nsValue,
        name,
        uuid,
      };
    } catch (error) {
      throw new Error(`Impossibile generare UUID v5: ${error.message}`);
    }
  },
};


