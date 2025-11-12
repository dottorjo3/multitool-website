// 🔧 File: backend/tools/pdf-remove-metadata.js
// 🔗 Rimuove metadati e info sensibili da un PDF

const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const { saveBufferToTmp } = require('../core/pdfTools');

module.exports = {
  async run({ filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un singolo PDF da ripulire');
    }

    const buffer = fs.readFileSync(filesMeta[0].filePath);
    const pdfDoc = await PDFDocument.load(buffer);

    pdfDoc.setTitle('');
    pdfDoc.setAuthor('');
    pdfDoc.setSubject('');
    pdfDoc.setKeywords([]);
    pdfDoc.setProducer('');
    pdfDoc.setCreator('');
    pdfDoc.setCreationDate(undefined);
    pdfDoc.setModificationDate(new Date());

    const pdfBytes = await pdfDoc.save();
    const outputPath = saveBufferToTmp(pdfBytes, { requestId, suffix: 'clean' });

    return {
      outputSizeBytes: pdfBytes.length,
      outputFile: {
        name: `${requestId}-metadata-free.pdf`,
        mimeType: 'application/pdf',
        base64: Buffer.from(pdfBytes).toString('base64'),
        tempPath: outputPath,
      },
    };
  },
};



