// 🔧 File: backend/tools/developer-ip-validator.js
// 🔗 Valida indirizzi IP (IPv4 e IPv6)

function isValidIPv4(ip) {
  const parts = ip.split('.');
  if (parts.length !== 4) return false;
  
  return parts.every(part => {
    const num = parseInt(part, 10);
    return !isNaN(num) && num >= 0 && num <= 255;
  });
}

function isValidIPv6(ip) {
  // Semplificato - verifica formato base IPv6
  if (ip.includes('::')) {
    const parts = ip.split('::');
    if (parts.length > 2) return false;
  }
  
  const parts = ip.split(':').filter(p => p.length > 0);
  if (parts.length < 2 || parts.length > 8) return false;
  
  return parts.every(part => {
    if (part.includes('.')) {
      // IPv4-mapped IPv6
      return isValidIPv4(part);
    }
    return /^[0-9a-fA-F]{1,4}$/.test(part);
  });
}

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    
    if (!input) {
      throw new Error('Inserisci un indirizzo IP da validare');
    }

    const isIPv4 = isValidIPv4(input);
    const isIPv6 = isValidIPv6(input);
    const isValid = isIPv4 || isIPv6;
    
    return {
      ip: input,
      isValid,
      type: isIPv4 ? 'IPv4' : isIPv6 ? 'IPv6' : 'Invalid',
      isIPv4,
      isIPv6,
    };
  },
};


