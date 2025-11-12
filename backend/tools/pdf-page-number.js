// 🔧 File: backend/tools/pdf-page-number.js
// 🔗 Aggiunge numerazione personalizzata alle pagine di un PDF

const fs = require('fs');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const { saveBufferToTmp } = require('../core/pdfTools');

function resolvePosition(position, pageSize, fontSize, margin) {
  const { width, height } = pageSize;
  const marginX = margin;
  const marginY = margin;

  switch (position) {
    case 'top-left':
      return { x: marginX, y: height - fontSize - marginY };
    case 'top-center':
      return { x: width / 2, y: height - fontSize - marginY, align: 'center' };
    case 'top-right':
      return { x: width - marginX, y: height - fontSize - marginY, align: 'right' };
    case 'bottom-center':
      return { x: width / 2, y: marginY, align: 'center' };
    case 'bottom-right':
      return { x: width - marginX, y: marginY, align: 'right' };
    case 'bottom-left':
    default:
      return { x: marginX, y: marginY };
  }
}

module.exports = {
  async run({ filesMeta, params, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un solo PDF da numerare');
    }

    const startNumber = Number(params.startNumber || 1);
    const prefix = params.prefix || '';
    const position = params.position || 'bottom-center';
    const fontSize = Math.max(Number(params.fontSize || 12), 6);
    const margin = Math.max(Number(params.margin || 24), 10);

    const buffer = fs.readFileSync(filesMeta[0].filePath);
    const pdfDoc = await PDFDocument.load(buffer);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const color = rgb(0.2, 0.2, 0.2);

    const pages = pdfDoc.getPages();
    pages.forEach((page, idx) => {
      const pageNumber = prefix ? `${prefix} ${startNumber + idx}` : String(startNumber + idx);
      const { width, height } = page.getSize();
      const coords = resolvePosition(position, { width, height }, fontSize, margin);

      let textX = coords.x;
      if (coords.align === 'center') {
        const textWidth = font.widthOfTextAtSize(pageNumber, fontSize);
        textX = coords.x - textWidth / 2;
      } else if (coords.align === 'right') {
        const textWidth = font.widthOfTextAtSize(pageNumber, fontSize);
        textX = coords.x - textWidth;
      }

      page.drawText(pageNumber, {
        x: textX,
        y: coords.y,
        size: fontSize,
        font,
        color,
      });
    });

    const pdfBytes = await pdfDoc.save();
    const outputPath = saveBufferToTmp(pdfBytes, { requestId, suffix: 'numbered' });

    return {
      outputSizeBytes: pdfBytes.length,
      pages: pages.length,
      outputFile: {
        name: `${requestId}-numbered.pdf`,
        mimeType: 'application/pdf',
        base64: Buffer.from(pdfBytes).toString('base64'),
        tempPath: outputPath,
      },
    };
  },
};



