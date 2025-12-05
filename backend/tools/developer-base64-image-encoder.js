// 🔧 File: backend/tools/developer-base64-image-encoder.js
// 🔗 Converte immagine a Base64 e viceversa (per testo URL/Base64)

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const mode = params.mode || 'encode'; // 'encode' o 'decode'
    
    if (!input) {
      throw new Error('Inserisci del testo da convertire');
    }

    if (mode === 'encode') {
      // Converte testo a Base64
      const encoded = Buffer.from(input, 'utf8').toString('base64');
      
      // Crea data URL se richiesto
      const mimeType = params.mimeType || 'text/plain';
      const dataUrl = `data:${mimeType};base64,${encoded}`;
      
      return {
        original: input,
        base64: encoded,
        dataUrl,
        mode: 'encode',
        mimeType,
        originalLength: input.length,
        base64Length: encoded.length,
      };
    } else {
      // Decodifica Base64
      try {
        // Rimuovi data URL prefix se presente
        let base64 = input;
        if (input.startsWith('data:')) {
          const commaIndex = input.indexOf(',');
          if (commaIndex > 0) {
            const prefix = input.substring(0, commaIndex);
            base64 = input.substring(commaIndex + 1);
            const mimeMatch = prefix.match(/data:([^;]+)/);
            params.mimeType = mimeMatch ? mimeMatch[1] : null;
          }
        }
        
        const decoded = Buffer.from(base64, 'base64').toString('utf8');
        
        return {
          original: input,
          decoded,
          mode: 'decode',
          mimeType: params.mimeType || null,
          originalLength: input.length,
          decodedLength: decoded.length,
        };
      } catch (error) {
        throw new Error(`Errore durante la decodifica: ${error.message}`);
      }
    }
  },
};

