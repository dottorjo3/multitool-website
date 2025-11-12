// 🔧 File: backend/tools/image-batch-convert.js
// 🔗 Converte in batch immagini multiple e restituisce archivio ZIP

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const archiver = require('archiver');
const { TMP_DIR } = require('../core/config');

const SUPPORTED_FORMATS = ['jpeg', 'jpg', 'png', 'webp', 'avif', 'tiff'];

async function convertImage(inputPath, outputPath, format, quality) {
  const pipeline = sharp(inputPath);
  switch (format) {
    case 'png':
      await pipeline.png({ compressionLevel: 9 }).toFile(outputPath);
      break;
    case 'webp':
      await pipeline.webp({ quality }).toFile(outputPath);
      break;
    case 'avif':
      await pipeline.avif({ quality }).toFile(outputPath);
      break;
    case 'tiff':
      await pipeline.tiff({ quality }).toFile(outputPath);
      break;
    default:
      await pipeline.jpeg({ quality }).toFile(outputPath);
  }
}

async function createZipArchive(files, archivePath) {
  await fs.promises.mkdir(path.dirname(archivePath), { recursive: true });
  const output = fs.createWriteStream(archivePath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  const finalizePromise = new Promise((resolve, reject) => {
    output.on('close', resolve);
    archive.on('error', reject);
  });

  archive.pipe(output);
  files.forEach((file) => {
    archive.file(file.path, { name: file.name });
  });
  archive.finalize();

  await finalizePromise;
}

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length === 0) {
      throw new Error('Carica almeno un file immagine da convertire');
    }

    const formatRaw = (params.format || '').toLowerCase();
    const format = SUPPORTED_FORMATS.includes(formatRaw) ? formatRaw : 'jpeg';
    const quality = params.quality ? Number(params.quality) : 85;

    const processedFiles = [];

    try {
      for (const file of filesMeta) {
        const baseName = path.parse(file.originalName).name || 'image';
        const safeName = `${baseName}.${format === 'jpg' ? 'jpg' : format}`;
        const targetPath = path.resolve(TMP_DIR, `${requestId}-${safeName}`);
        await convertImage(file.filePath, targetPath, format, quality);
        processedFiles.push({ path: targetPath, name: safeName });
      }

      const archivePath = path.resolve(TMP_DIR, `${requestId}-converted.zip`);
      await createZipArchive(processedFiles, archivePath);
      const buffer = await fs.promises.readFile(archivePath);

      return {
        convertedCount: processedFiles.length,
        format,
        archive: {
          name: `${requestId}-converted.zip`,
          mimeType: 'application/zip',
          base64: buffer.toString('base64'),
          tempPath: archivePath,
        },
        outputSizeBytes: buffer.length,
      };
    } finally {
      // rimuove file temporanei generati per il batch
      await Promise.all(
        processedFiles.map((file) =>
          fs.promises.unlink(file.path).catch(() => {}),
        ),
      );
    }
  },
};

