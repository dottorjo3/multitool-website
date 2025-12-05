// 🔧 File: backend/tools/security-hmac-file.js
// 🔗 Calcola HMAC di un file

const crypto = require('crypto');
const fs = require('fs');

module.exports = {
  async run({ params, filesMeta }) {
    const secret = params.secret?.trim() || '';
    const algorithm = params.algorithm || 'sha256';
    const encoding = params.encoding || 'hex';
    
    if (!filesMeta || filesMeta.length === 0) {
      throw new Error('Carica un file per calcolare l\'HMAC');
    }

    if (!secret) {
      throw new Error('Inserisci una chiave segreta');
    }

    const file = filesMeta[0];
    
    if (!fs.existsSync(file.filePath)) {
      throw new Error('File non trovato');
    }

    try {
      const fileBuffer = fs.readFileSync(file.filePath);
      const hmac = crypto.createHmac(algorithm, secret).update(fileBuffer).digest(encoding);
      
      return {
        fileName: file.originalName,
        fileSize: fileBuffer.length,
        algorithm: `HMAC-${algorithm.toUpperCase()}`,
        encoding,
        hmac,
        secretSet: !!secret,
        checksum: `hmac-${algorithm}:${hmac}`,
      };
    } catch (error) {
      throw new Error(`Errore durante il calcolo HMAC: ${error.message}`);
    }
  },
};


