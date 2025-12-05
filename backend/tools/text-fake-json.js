// 🔧 File: backend/tools/text-fake-json.js
// 🔗 Genera JSON falso/di esempio

function generateFakeJSON(type = 'object', depth = 2) {
  const randomString = () => Math.random().toString(36).substring(7);
  const randomNumber = () => Math.floor(Math.random() * 1000);
  const randomBoolean = () => Math.random() > 0.5;
  
  function generateValue(level) {
    if (level <= 0) {
      const types = ['string', 'number', 'boolean'];
      const type = types[Math.floor(Math.random() * types.length)];
      switch (type) {
        case 'string': return randomString();
        case 'number': return randomNumber();
        case 'boolean': return randomBoolean();
        default: return randomString();
      }
    }
    
    const types = ['object', 'array'];
    const selectedType = types[Math.floor(Math.random() * types.length)];
    
    if (selectedType === 'array') {
      const length = Math.floor(Math.random() * 3) + 1;
      return Array.from({ length }, () => generateValue(level - 1));
    } else {
      const keys = Math.floor(Math.random() * 3) + 2;
      const obj = {};
      for (let i = 0; i < keys; i++) {
        obj[randomString()] = generateValue(level - 1);
      }
      return obj;
    }
  }
  
  if (type === 'array') {
    return generateValue(depth);
  }
  
  return generateValue(depth);
}

module.exports = {
  async run({ params }) {
    const type = params.type || 'object';
    const depth = params.depth ? parseInt(params.depth, 10) : 2;
    const pretty = params.pretty === 'true';
    
    if (depth < 1 || depth > 5) {
      throw new Error('La profondità deve essere tra 1 e 5');
    }

    const fake = generateFakeJSON(type, depth);
    const json = pretty 
      ? JSON.stringify(fake, null, 2)
      : JSON.stringify(fake);
    
    return {
      json,
      type,
      depth,
      pretty,
      length: json.length,
    };
  },
};

