// 🔧 File: backend/tools/security-jwt-decoder.js
// 🔗 Decodifica JWT (solo lettura header e payload, senza verifica)

module.exports = {
  async run({ params }) {
    const token = params.token?.trim() || '';
    
    if (!token) {
      throw new Error('Inserisci un JWT da decodificare');
    }

    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('JWT deve avere 3 parti separate da punti');
      }
      
      const [headerB64, payloadB64, signature] = parts;
      
      // Decodifica header e payload (Base64URL)
      const header = JSON.parse(Buffer.from(headerB64.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString());
      const payload = JSON.parse(Buffer.from(payloadB64.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString());
      
      // Estrai informazioni
      const now = Math.floor(Date.now() / 1000);
      const isExpired = payload.exp && payload.exp < now;
      const isNotYetValid = payload.nbf && payload.nbf > now;
      
      return {
        token: token.substring(0, 50) + '...',
        header,
        payload,
        signature: signature.substring(0, 20) + '...',
        algorithm: header.alg,
        isExpired,
        isNotYetValid,
        expiresAt: payload.exp ? new Date(payload.exp * 1000).toISOString() : null,
        issuedAt: payload.iat ? new Date(payload.iat * 1000).toISOString() : null,
        note: 'JWT decodificato (solo lettura, non verificato)',
      };
    } catch (error) {
      throw new Error(`Errore durante la decodifica JWT: ${error.message}`);
    }
  },
};


