// 🔧 File: backend/tools/security-base64url-encode.js
// 🔗 Codifica Base64URL

module.exports = {
  async run({ params }) {
    const text = params.text?.trim() || '';
    
    if (!text) {
      throw new Error('Inserisci il testo da codificare');
    }

    try {
      const base64 = Buffer.from(text, 'utf8').toString('base64');
      const base64url = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      
      return {
        original: text,
        encoded: base64url,
        algorithm: 'Base64URL',
        originalLength: text.length,
        encodedLength: base64url.length,
        note: 'Base64URL è sicuro per URL (nessun padding, caratteri URL-safe)',
      };
    } catch (error) {
      throw new Error(`Errore durante la codifica: ${error.message}`);
    }
  },
};


