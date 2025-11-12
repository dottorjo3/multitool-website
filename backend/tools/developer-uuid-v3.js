// 🔧 File: backend/tools/developer-uuid-v3.js
// 🔗 Genera UUID v3 deterministici basati su namespace e nome

const { v3: uuidv3 } = require('uuid');

const NAMESPACES = {
  dns: uuidv3.DNS,
  url: uuidv3.URL,
};

module.exports = {
  async run({ params }) {
    const namespace = (params.namespace || 'dns').toLowerCase();
    const name = params.name?.trim();

    if (!name) {
      throw new Error('Inserisci il valore su cui calcolare l’UUID');
    }

    let nsValue = params.customNamespace?.trim();
    if (!nsValue) {
      nsValue = NAMESPACES[namespace];
    }

    if (!nsValue) {
      throw new Error('Namespace non valido o mancante');
    }

    try {
      const uuid = uuidv3(name, nsValue);
      return {
        version: 'v3',
        namespace: nsValue,
        name,
        uuid,
      };
    } catch (error) {
      throw new Error(`Impossibile generare UUID v3: ${error.message}`);
    }
  },
};



