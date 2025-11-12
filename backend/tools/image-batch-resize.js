// 🔧 File: backend/tools/image-batch-resize.js
// 🔗 Ridimensiona più immagini e restituisce archivio ZIP

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const archiver = require('archiver');
const { TMP_DIR } = require('../core/config');

const SUPPORTED_FORMATS = ['jpeg', 'jpg', 'png', 'webp', 'avif', 'tiff'];

async function resizeImage(inputPath, outputPath, options) {
  const {
    width,
    height,
    fit,
    withoutEnlargement,
    format,
    quality,
  } = options;

  const pipeline = sharp(inputPath).resize({
    width,
    height,
    fit,
    withoutEnlargement,
  });

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
  files.forEach((file) => archive.file(file.path, { name: file.name }));
  archive.finalize();
  await finalizePromise;
}

module.exports = {
  async run({ params, filesMeta, requestId }) {
    if (!filesMeta || filesMeta.length === 0) {
      throw new Error('Carica almeno un file immagine da ridimensionare');
    }

    const width = params.width ? Number(params.width) : null;
    const height = params.height ? Number(params.height) : null;
    const fitRaw = (params.fit || 'cover').toLowerCase();
    const fit = ['cover', 'contain', 'inside', 'outside', 'fill'].includes(fitRaw) ? fitRaw : 'cover';
    const withoutEnlargement = params.withoutEnlargement !== 'false';
    const formatRaw = params.format ? params.format.toLowerCase() : null;
    const format = SUPPORTED_FORMATS.includes(formatRaw) ? formatRaw : null;
    const quality = params.quality ? Number(params.quality) : 85;

    if (!width && !height) {
      throw new Error('Specifica almeno larghezza o altezza');
    }

    const processedFiles = [];

    try {
      for (const file of filesMeta) {
        const baseName = path.parse(file.originalName).name || 'image';
        const targetFormat = format || path.extname(file.originalName).replace('.', '').toLowerCase() || 'jpeg';
        const safeFormat = SUPPORTED_FORMATS.includes(targetFormat) ? targetFormat : 'jpeg';
        const targetPath = path.resolve(TMP_DIR, `${requestId}-${baseName}.${safeFormat === 'jpg' ? 'jpg' : safeFormat}`);

        await resizeImage(file.filePath, targetPath, {
          width,
          height,
          fit,
          withoutEnlargement,
          format: safeFormat,
          quality,
        });

        processedFiles.push({ path: targetPath, name: path.basename(targetPath) });
      }

      const archivePath = path.resolve(TMP_DIR, `${requestId}-resized.zip`);
      await createZipArchive(processedFiles, archivePath);
      const buffer = await fs.promises.readFile(archivePath);

      return {
        resizedCount: processedFiles.length,
        width,
        height,
        fit,
        withoutEnlargement,
        archive: {
          name: `${requestId}-resized.zip`,
          mimeType: 'application/zip',
          base64: buffer.toString('base64'),
          tempPath: archivePath,
        },
        outputSizeBytes: buffer.length,
      };
    } finally {
      await Promise.all(
        processedFiles.map((file) => fs.promises.unlink(file.path).catch(() => {})),
      );
    }
  },
};

