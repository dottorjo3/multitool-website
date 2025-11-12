// 🔧 File: backend/tools/developer-jwt-decoder.js
// 🔗 Decodifica header e payload di un JWT senza validarli

function decodeSegment(segment) {
  const padded = segment.replace(/-/g, '+').replace(/_/g, '/')
    + '='.repeat((4 - (segment.length % 4)) % 4);
  return Buffer.from(padded, 'base64').toString('utf8');
}

module.exports = {
  async run({ params }) {
    const token = params.token?.trim();

    if (!token) {
      throw new Error('Inserisci un token JWT da decodificare');
    }

    const parts = token.split('.');
    if (parts.length < 2) {
      throw new Error('Token JWT non valido (formato errato)');
    }

    try {
      const headerJson = decodeSegment(parts[0]);
      const payloadJson = decodeSegment(parts[1]);

      const header = JSON.parse(headerJson);
      const payload = JSON.parse(payloadJson);

      return {
        header,
        payload,
        signaturePresent: parts.length === 3,
      };
    } catch (error) {
      throw new Error('Impossibile decodificare il token: ' + error.message);
    }
  },
};


