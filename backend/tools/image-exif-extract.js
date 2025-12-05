// 🔧 File: backend/tools/image-exif-extract.js
// 🔗 Estrae metadati EXIF dall'immagine

const sharp = require('sharp');

module.exports = {
  async run({ params, filesMeta }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un solo file immagine');
    }

    const file = filesMeta[0];
    
    try {
      const metadata = await sharp(file.filePath).metadata();
      
      return {
        exif: metadata.exif ? 'Presente' : 'Assente',
        metadata: {
          width: metadata.width,
          height: metadata.height,
          format: metadata.format,
          channels: metadata.channels,
          depth: metadata.depth,
          density: metadata.density,
          hasProfile: metadata.hasProfile,
          hasAlpha: metadata.hasAlpha,
          orientation: metadata.orientation,
          space: metadata.space,
        },
        exifData: metadata.exif || null,
      };
    } catch (error) {
      throw new Error(`Errore durante l'estrazione EXIF: ${error.message}`);
    }
  },
};


