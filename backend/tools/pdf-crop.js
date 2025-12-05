// 🔧 File: backend/tools/pdf-crop.js
// 🔗 Ritaglia pagine PDF

const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length === 0) {
      throw new Error('Carica un file PDF');
    }

    const x = parseFloat(params.x) || 0;
    const y = parseFloat(params.y) || 0;
    const width = parseFloat(params.width);
    const height = parseFloat(params.height);
    const pages = params.pages || 'all';
    
    if (!width || !height) {
      throw new Error('Specifica larghezza e altezza per il ritaglio');
    }

    try {
      const file = filesMeta[0];
      const pdfBuffer = fs.readFileSync(file.filePath);
      const pdfDoc = await PDFDocument.load(pdfBuffer);
      
      const pageIndices = pages === 'all' 
        ? Array.from({ length: pdfDoc.getPageCount() }, (_, i) => i)
        : pages.split(',').map(p => parseInt(p.trim(), 10) - 1);
      
      const pagesList = pdfDoc.getPages();
      
      pageIndices.forEach(pageIndex => {
        if (pageIndex >= 0 && pageIndex < pagesList.length) {
          const page = pagesList[pageIndex];
          const { width: pageWidth, height: pageHeight } = page.getSize();
          
          // Imposta mediaBox più piccolo
          page.setCropBox(x, y, Math.min(width, pageWidth), Math.min(height, pageHeight));
        }
      });
      
      const pdfBytes = await pdfDoc.save();
      const outputPath = `/tmp/${requestId}-cropped.pdf`;
      fs.writeFileSync(outputPath, pdfBytes);
      
      return {
        outputSizeBytes: pdfBytes.length,
        pagesCropped: pageIndices.length,
        outputFile: {
          name: `${requestId}-cropped.pdf`,
          mimeType: 'application/pdf',
          base64: pdfBytes.toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante il ritaglio: ${error.message}`);
    }
  },
};


