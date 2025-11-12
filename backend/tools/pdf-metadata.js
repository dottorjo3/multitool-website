// 🔧 File: backend/tools/pdf-metadata.js
// 🔗 Farm Ready — visualizza o pulisce metadati PDF

const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const { saveBufferToTmp } = require('../core/pdfTools');

async function readMetadata(pdfBuffer) {
  const pdfDoc = await PDFDocument.load(pdfBuffer, { updateMetadata: false });
  const metadata = pdfDoc.getTitle()
    || pdfDoc.getAuthor()
    || pdfDoc.getSubject()
    || pdfDoc.getKeywords()
    || pdfDoc.getProducer()
    || pdfDoc.getCreator()
    || pdfDoc.getCreationDate()
    || pdfDoc.getModificationDate()
    ? {
        title: pdfDoc.getTitle() || null,
        author: pdfDoc.getAuthor() || null,
        subject: pdfDoc.getSubject() || null,
        keywords: pdfDoc.getKeywords() || null,
        producer: pdfDoc.getProducer() || null,
        creator: pdfDoc.getCreator() || null,
        creationDate: pdfDoc.getCreationDate()
          ? pdfDoc.getCreationDate().toISOString()
          : null,
        modificationDate: pdfDoc.getModificationDate()
          ? pdfDoc.getModificationDate().toISOString()
          : null,
      }
    : {};

  const info = pdfDoc.context.lookup(pdfDoc.context.trailer.get('Info'));
  const raw = {};
  if (info && info.entries) {
    info.entries.forEach((value, key) => {
      raw[key] = value?.value || null;
    });
  }

  return { metadata, raw };
}

async function stripMetadata(pdfBuffer) {
  const pdfDoc = await PDFDocument.load(pdfBuffer);

  pdfDoc.setTitle('');
  pdfDoc.setAuthor('');
  pdfDoc.setSubject('');
  pdfDoc.setKeywords([]);
  pdfDoc.setProducer('');
  pdfDoc.setCreator('');

  const metadataStream = pdfDoc.catalog.lookup(PDFDocument.PDFMetaKeys.Metadata);
  if (metadataStream) {
    pdfDoc.catalog.delete(PDFDocument.PDFMetaKeys.Metadata);
  }

  const newBuffer = await pdfDoc.save({ useObjectStreams: true });
  return newBuffer;
}

module.exports = {
  async run({ filesMeta, params, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un solo PDF per leggere o pulire i metadati');
    }

    const buffer = fs.readFileSync(filesMeta[0].filePath);
    const mode = params.mode || 'view'; // view | clean

    const info = await readMetadata(buffer);

    if (mode === 'clean') {
      const cleanedBuffer = await stripMetadata(buffer);
      const outputPath = saveBufferToTmp(cleanedBuffer, { requestId, suffix: 'metadata-clean' });

      return {
        mode,
        metadataBefore: info,
        metadataAfter: await readMetadata(cleanedBuffer),
        outputFile: {
          name: `${requestId}-metadata-clean.pdf`,
          mimeType: 'application/pdf',
          base64: cleanedBuffer.toString('base64'),
          tempPath: outputPath,
        },
      };
    }

    return {
      mode,
      metadata: info.metadata,
      raw: info.raw,
    };
  },
};


