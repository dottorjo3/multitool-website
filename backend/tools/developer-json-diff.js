// 🔧 File: backend/tools/developer-json-diff.js
// 🔗 Confronta due JSON e restituisce differenze (added/removed/changed)

function parseJson(label, value) {
  try {
    return JSON.parse(value);
  } catch (error) {
    throw new Error(`${label} non è un JSON valido: ${error.message}`);
  }
}

function diffObjects(objA, objB, path = '') {
  const added = [];
  const removed = [];
  const changed = [];

  const keys = new Set([...Object.keys(objA || {}), ...Object.keys(objB || {})]);

  keys.forEach((key) => {
    const currentPath = path ? `${path}.${key}` : key;
    const valA = objA ? objA[key] : undefined;
    const valB = objB ? objB[key] : undefined;
    const existsA = Object.prototype.hasOwnProperty.call(objA || {}, key);
    const existsB = Object.prototype.hasOwnProperty.call(objB || {}, key);

    if (!existsA && existsB) {
      added.push({ path: currentPath, value: valB });
    } else if (existsA && !existsB) {
      removed.push({ path: currentPath, value: valA });
    } else if (typeof valA === 'object' && valA !== null && typeof valB === 'object' && valB !== null) {
      const nested = diffObjects(valA, valB, currentPath);
      added.push(...nested.added);
      removed.push(...nested.removed);
      changed.push(...nested.changed);
    } else if (valA !== valB) {
      changed.push({ path: currentPath, oldValue: valA, newValue: valB });
    }
  });

  return { added, removed, changed };
}

module.exports = {
  async run({ params }) {
    const jsonA = params.jsonA ?? '';
    const jsonB = params.jsonB ?? '';

    if (!jsonA.trim() || !jsonB.trim()) {
      throw new Error('Inserisci entrambi i JSON da confrontare');
    }

    const parsedA = parseJson('JSON A', jsonA);
    const parsedB = parseJson('JSON B', jsonB);

    if (typeof parsedA !== 'object' || parsedA === null || typeof parsedB !== 'object' || parsedB === null) {
      throw new Error('Entrambi i valori devono essere oggetti o array JSON');
    }

    const diff = diffObjects(parsedA, parsedB);

    return {
      addedCount: diff.added.length,
      removedCount: diff.removed.length,
      changedCount: diff.changed.length,
      ...diff,
    };
  },
};

