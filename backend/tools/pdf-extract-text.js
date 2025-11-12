// 🔧 File: backend/tools/pdf-extract-text.js
// 🔗 Farm Ready — estrae il testo da un PDF

const fs = require('fs');
const { extractText } = require('../core/pdfTools');

module.exports = {
  async run({ filesMeta }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un solo PDF da analizzare');
    }

    const buffer = fs.readFileSync(filesMeta[0].filePath);
    const text = await extractText(buffer);

    return {
      text,
      length: text.length,
    };
  },
};

