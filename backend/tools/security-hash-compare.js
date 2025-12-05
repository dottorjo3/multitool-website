// 🔧 File: backend/tools/security-hash-compare.js
// 🔗 Confronta due hash

module.exports = {
  async run({ params }) {
    const hash1 = params.hash1?.trim() || '';
    const hash2 = params.hash2?.trim() || '';
    
    if (!hash1 || !hash2) {
      throw new Error('Inserisci entrambi gli hash da confrontare');
    }

    // Normalizza (case-insensitive)
    const normalized1 = hash1.toLowerCase().replace(/\s/g, '');
    const normalized2 = hash2.toLowerCase().replace(/\s/g, '');
    
    const isEqual = normalized1 === normalized2;
    
    return {
      hash1: hash1.substring(0, 30) + '...',
      hash2: hash2.substring(0, 30) + '...',
      isEqual,
      message: isEqual 
        ? 'Gli hash corrispondono ✓' 
        : 'Gli hash non corrispondono ✗',
      match: isEqual,
    };
  },
};


