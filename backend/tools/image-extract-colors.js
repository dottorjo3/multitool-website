// 🔧 File: backend/tools/image-extract-colors.js
// 🔗 Estrae colori dominanti dall'immagine

const sharp = require('sharp');

module.exports = {
  async run({ params, filesMeta }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un solo file immagine');
    }

    const file = filesMeta[0];
    const count = parseInt(params.count, 10) || 5;
    
    try {
      const { dominant } = await sharp(file.filePath)
        .resize(200, 200, { fit: 'inside' })
        .stats();
      
      const colors = [];
      if (dominant) {
        colors.push({
          r: dominant.r,
          g: dominant.g,
          b: dominant.b,
          hex: `#${dominant.r.toString(16).padStart(2, '0')}${dominant.g.toString(16).padStart(2, '0')}${dominant.b.toString(16).padStart(2, '0')}`,
        });
      }
      
      return {
        colors,
        count: colors.length,
        dominant: colors[0] || null,
      };
    } catch (error) {
      throw new Error(`Errore durante l'estrazione colori: ${error.message}`);
    }
  },
};


