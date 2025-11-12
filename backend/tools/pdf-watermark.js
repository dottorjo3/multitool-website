// 🔧 File: backend/tools/pdf-watermark.js
// 🔗 Farm Ready — applica un watermark testuale diagonale su ogni pagina

const fs = require('fs');
const { PDFDocument, StandardFonts, rgb, degrees } = require('pdf-lib');
const { saveBufferToTmp } = require('../core/pdfTools');

module.exports = {
  async run({ filesMeta, params, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un solo PDF su cui applicare il watermark');
    }

    const text = params.text;
    if (!text || text.trim().length === 0) {
      throw new Error('Inserisci il testo del watermark');
    }

    const opacity = Math.min(Math.max(Number(params.opacity || 0.2), 0.05), 1);
    const fontSize = Number(params.fontSize || 48);

    const buffer = fs.readFileSync(filesMeta[0].filePath);
    const pdfDoc = await PDFDocument.load(buffer);
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    pdfDoc.getPages().forEach((page) => {
      const { width, height } = page.getSize();
      page.drawText(text, {
        x: width / 4,
        y: height / 2,
        size: fontSize,
        font,
        color: rgb(1, 0, 0),
        opacity,
        rotate: degrees(-45),
      });
    });

    const watermarkedBuffer = await pdfDoc.save();
    const outputPath = saveBufferToTmp(watermarkedBuffer, { requestId, suffix: 'watermarked' });

    return {
      outputSizeBytes: watermarkedBuffer.length,
      watermarkText: text,
      outputFile: {
        name: `${requestId}-watermarked.pdf`,
        mimeType: 'application/pdf',
        base64: watermarkedBuffer.toString('base64'),
        tempPath: outputPath,
      },
    };
  },
};

