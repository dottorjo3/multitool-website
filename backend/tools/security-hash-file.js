// 🔧 File: backend/tools/security-hash-file.js
// 🔗 Calcola hash di un file

const crypto = require('crypto');
const fs = require('fs');

module.exports = {
  async run({ params, filesMeta }) {
    const algorithm = params.algorithm || 'sha256';
    const encoding = params.encoding || 'hex';
    
    if (!filesMeta || filesMeta.length === 0) {
      throw new Error('Carica un file da hashare');
    }

    const file = filesMeta[0];
    
    if (!fs.existsSync(file.filePath)) {
      throw new Error('File non trovato');
    }

    try {
      const fileBuffer = fs.readFileSync(file.filePath);
      const hash = crypto.createHash(algorithm).update(fileBuffer).digest(encoding);
      
      return {
        fileName: file.originalName,
        fileSize: fileBuffer.length,
        algorithm,
        encoding,
        hash,
        checksum: `${algorithm}:${hash}`,
      };
    } catch (error) {
      throw new Error(`Errore durante il calcolo hash: ${error.message}`);
    }
  },
};


