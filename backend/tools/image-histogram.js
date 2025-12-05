// 🔧 File: backend/tools/image-histogram.js
// 🔗 Genera istogramma colori immagine

const sharp = require('sharp');

module.exports = {
  async run({ params, filesMeta }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un solo file immagine');
    }

    const file = filesMeta[0];
    
    try {
      const { data, info } = await sharp(file.filePath)
        .raw()
        .toBuffer({ resolveWithObject: true });
      
      const channels = info.channels;
      const histogram = {
        red: Array(256).fill(0),
        green: Array(256).fill(0),
        blue: Array(256).fill(0),
      };
      
      for (let i = 0; i < data.length; i += channels) {
        histogram.red[data[i]]++;
        if (channels >= 2) histogram.green[data[i + 1]]++;
        if (channels >= 3) histogram.blue[data[i + 2]]++;
      }
      
      return {
        histogram,
        channels,
        width: info.width,
        height: info.height,
      };
    } catch (error) {
      throw new Error(`Errore durante la generazione istogramma: ${error.message}`);
    }
  },
};


