// 🔧 File: backend/core/imageTools.js
// 🔗 Farm Ready — funzioni principali basate su Sharp

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const { TMP_DIR } = require('./config');

async function resizeImage(inputPath, { width, height, fit = 'inside' }, requestId) {
  const fileName = `${requestId}-resize.jpg`;
  const outputPath = path.resolve(TMP_DIR, fileName);

  await sharp(inputPath).resize({
    width: width ? Number(width) : undefined,
    height: height ? Number(height) : undefined,
    fit,
  }).toFormat('jpeg').toFile(outputPath);

  return outputPath;
}

async function convertImage(inputPath, format, requestId) {
  const safeFormat = format.toLowerCase();
  const allowed = ['jpeg', 'jpg', 'png', 'webp', 'tiff', 'avif'];
  if (!allowed.includes(safeFormat)) {
    throw new Error(`Formato non supportato: ${format}`);
  }

  const extension = safeFormat === 'jpg' ? 'jpeg' : safeFormat;
  const fileName = `${requestId}-convert.${extension}`;
  const outputPath = path.resolve(TMP_DIR, fileName);

  await sharp(inputPath).toFormat(extension).toFile(outputPath);
  return outputPath;
}

async function compressImage(inputPath, quality, requestId) {
  const fileName = `${requestId}-compress.jpg`;
  const outputPath = path.resolve(TMP_DIR, fileName);

  await sharp(inputPath).jpeg({ quality: Number(quality) || 75 }).toFile(outputPath);
  return outputPath;
}

function readFileBuffer(filePath) {
  return fs.readFileSync(filePath);
}

module.exports = {
  resizeImage,
  convertImage,
  compressImage,
  readFileBuffer,
};

