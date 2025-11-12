// 🔧 File: backend/tools/pdf-header-footer.js
// 🔗 Aggiunge intestazioni e piè di pagina testuali a ogni pagina

const fs = require('fs');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const { saveBufferToTmp } = require('../core/pdfTools');

module.exports = {
  async run({ filesMeta, params, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un solo PDF su cui applicare header/footer');
    }

    const headerText = (params.headerText || '').trim();
    const footerText = (params.footerText || '').trim();
    if (!headerText && !footerText) {
      throw new Error('Inserisci almeno un testo per header o footer');
    }

    const fontSize = Math.max(Number(params.fontSize || 12), 6);
    const margin = Math.max(Number(params.margin || 24), 10);
    const color = params.color || '#333333';

    const colorRgb = (() => {
      if (!/^#?[0-9a-fA-F]{6}$/.test(color)) {
        return rgb(0.2, 0.2, 0.2);
      }
      const hex = color.startsWith('#') ? color.slice(1) : color;
      const r = parseInt(hex.slice(0, 2), 16) / 255;
      const g = parseInt(hex.slice(2, 4), 16) / 255;
      const b = parseInt(hex.slice(4, 6), 16) / 255;
      return rgb(r, g, b);
    })();

    const buffer = fs.readFileSync(filesMeta[0].filePath);
    const pdfDoc = await PDFDocument.load(buffer);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    pdfDoc.getPages().forEach((page) => {
      const { width, height } = page.getSize();

      if (headerText) {
        const textWidth = font.widthOfTextAtSize(headerText, fontSize);
        page.drawText(headerText, {
          x: (width - textWidth) / 2,
          y: height - fontSize - margin,
          size: fontSize,
          font,
          color: colorRgb,
        });
      }

      if (footerText) {
        const textWidth = font.widthOfTextAtSize(footerText, fontSize);
        page.drawText(footerText, {
          x: (width - textWidth) / 2,
          y: margin,
          size: fontSize,
          font,
          color: colorRgb,
        });
      }
    });

    const pdfBytes = await pdfDoc.save();
    const outputPath = saveBufferToTmp(pdfBytes, { requestId, suffix: 'header-footer' });

    return {
      headerApplied: Boolean(headerText),
      footerApplied: Boolean(footerText),
      outputSizeBytes: pdfBytes.length,
      outputFile: {
        name: `${requestId}-header-footer.pdf`,
        mimeType: 'application/pdf',
        base64: Buffer.from(pdfBytes).toString('base64'),
        tempPath: outputPath,
      },
    };
  },
};



