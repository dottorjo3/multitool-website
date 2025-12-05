// 🔧 File: backend/tools/text-extract-ips.js
// 🔗 Estrae indirizzi IP (IPv4 e IPv6) da un testo

const IPV4_REGEX = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g;
const IPV6_REGEX = /\b(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}\b|\b(?:[0-9a-fA-F]{1,4}:)*::(?:[0-9a-fA-F]{1,4}:)*[0-9a-fA-F]{1,4}\b/g;

module.exports = {
  async run({ params }) {
    const text = params.input?.trim() || '';
    
    if (!text) {
      throw new Error('Inserisci il testo da cui estrarre gli indirizzi IP');
    }

    const ips = [];
    const seen = new Set();
    let match;

    // Estrai IPv4
    while ((match = IPV4_REGEX.exec(text)) !== null) {
      const ip = match[0];
      if (!seen.has(ip)) {
        seen.add(ip);
        ips.push({
          ip,
          type: 'IPv4',
          position: match.index,
        });
      }
    }

    // Estrai IPv6
    while ((match = IPV6_REGEX.exec(text)) !== null) {
      const ip = match[0];
      if (!seen.has(ip)) {
        seen.add(ip);
        ips.push({
          ip,
          type: 'IPv6',
          position: match.index,
        });
      }
    }

    // Ordina per posizione nel testo
    ips.sort((a, b) => a.position - b.position);

    return {
      count: ips.length,
      ipv4Count: ips.filter(i => i.type === 'IPv4').length,
      ipv6Count: ips.filter(i => i.type === 'IPv6').length,
      ips: ips.map(i => i.ip),
      ipsWithDetails: ips,
    };
  },
};

