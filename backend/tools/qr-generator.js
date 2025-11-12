// 🔧 File: backend/tools/qr-generator.js
// 🔗 Farm Ready — Generatore QR code (PNG base64)

const QRCode = require('qrcode');

module.exports = {
  async run({ params, requestId }) {
    const text = params?.text || '';
    const width = params?.width ? Number(params.width) : 512;
    const margin = params?.margin ? Number(params.margin) : 2;
    const colorDark = params?.colorDark || '#000000';
    const colorLight = params?.colorLight || '#FFFFFF';

    try {
      const dataUrl = await QRCode.toDataURL(text, {
        width,
        margin,
        color: {
          dark: colorDark,
          light: colorLight,
        },
      });

      return {
        requestId,
        width,
        margin,
        colorDark,
        colorLight,
        output: dataUrl,
      };
    } catch (error) {
      throw new Error(`Impossibile generare il QR code: ${error.message}`);
    }
  },
};


