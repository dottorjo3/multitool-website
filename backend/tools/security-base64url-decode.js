// 🔧 File: backend/tools/security-base64url-decode.js
// 🔗 Decodifica Base64URL

module.exports = {
  async run({ params }) {
    const base64url = params.base64url?.trim() || '';
    
    if (!base64url) {
      throw new Error('Inserisci il testo Base64URL da decodificare');
    }

    try {
      // Converti Base64URL a Base64 standard
      let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
      
      // Aggiungi padding se necessario
      const pad = base64.length % 4;
      if (pad) {
        base64 += '='.repeat(4 - pad);
      }
      
      const decoded = Buffer.from(base64, 'base64').toString('utf8');
      
      return {
        base64url: base64url.substring(0, 50) + '...',
        decoded,
        algorithm: 'Base64URL',
        originalLength: base64url.length,
        decodedLength: decoded.length,
      };
    } catch (error) {
      throw new Error(`Errore durante la decodifica: ${error.message}`);
    }
  },
};


