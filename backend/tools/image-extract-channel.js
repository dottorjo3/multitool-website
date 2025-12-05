// 🔧 File: backend/tools/image-extract-channel.js
// 🔗 Estrae canale colore specifico (R, G, B)

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { TMP_DIR } = require('../core/config');

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length !== 1) {
      throw new Error('Carica un solo file immagine');
    }

    const file = filesMeta[0];
    const channel = params.channel || 'red'; // 'red', 'green', 'blue', 'alpha'
    
    try {
      const { data, info } = await sharp(file.filePath)
        .raw()
        .toBuffer({ resolveWithObject: true });
      
      const channels = info.channels;
      let channelIndex = 0;
      
      switch (channel) {
        case 'red':
          channelIndex = 0;
          break;
        case 'green':
          channelIndex = channels >= 2 ? 1 : 0;
          break;
        case 'blue':
          channelIndex = channels >= 3 ? 2 : 0;
          break;
        case 'alpha':
          channelIndex = channels >= 4 ? 3 : 0;
          break;
      }
      
      // Estrai canale
      const channelData = Buffer.alloc(data.length);
      for (let i = 0; i < data.length; i += channels) {
        const value = data[i + channelIndex] || 0;
        channelData[i] = value;
        channelData[i + 1] = value;
        channelData[i + 2] = value;
        if (channels >= 4) channelData[i + 3] = 255;
      }
      
      const outputName = `${requestId}-${channel}.png`;
      const outputPath = path.resolve(TMP_DIR, outputName);
      
      await sharp(channelData, {
        raw: {
          width: info.width,
          height: info.height,
          channels: 4,
        },
      })
        .png()
        .toFile(outputPath);
      
      const outputStats = fs.statSync(outputPath);
      
      return {
        channel,
        outputSizeBytes: outputStats.size,
        outputFile: {
          name: outputName,
          mimeType: 'image/png',
          base64: fs.readFileSync(outputPath).toString('base64'),
          tempPath: outputPath,
        },
      };
    } catch (error) {
      throw new Error(`Errore durante l'estrazione canale: ${error.message}`);
    }
  },
};


