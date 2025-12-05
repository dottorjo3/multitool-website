// 🔧 File: backend/tools/image-qr-generator.js
// 🔗 Genera codice QR come immagine

const path = require('path');
const fs = require('fs');
const QRCode = require('qrcode');
const { TMP_DIR } = require('../core/config');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    const text = params.text || '';
    const size = parseInt(params.size, 10) || 500;
    
    if (!text) {
      throw new Error('Inserisci testo o URL per il QR code');
    }

    try {
      const outputName = `${requestId}-qr.png`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      await QRCode.toFile(outputPath, text, {
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        text,
        size,
        outputSizeBytes: outputStats.size,
        outputFile: {
          name: outputName,
          mimeType: 'image/png',
          base64: fs.readFileSync(outputPath).toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante la generazione QR: ${error.message}`);
    }
  },
};


