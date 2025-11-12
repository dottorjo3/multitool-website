// 🔧 File: backend/core/config.js
// 🔗 Farm Ready — gestione centralizzata della configurazione backend

const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// 🧠 Carichiamo le variabili di ambiente dal file .env (se presente)
dotenv.config();

const PROJECT_NAME = process.env.PROJECT_NAME || '{{PROJECT_NAME}}';

const ROOT_DIR = path.resolve(__dirname, '..');
const TMP_DIR = process.env.TMP_DIR || path.resolve(ROOT_DIR, '..', 'var', 'multitool', 'tmp');
const LOG_DIR = process.env.LOG_DIR || path.resolve(ROOT_DIR, '..', 'var', 'multitool', 'logs');
const REGISTRY_PATH = path.resolve(ROOT_DIR, 'db', 'tools_registry.json');
const SCHEMAS_DIR = path.resolve(ROOT_DIR, 'tools', 'schemas');
const USAGE_DIR = process.env.USAGE_DIR || path.resolve(ROOT_DIR, '..', 'var', 'multitool', 'usage');
const QPDF_PATH = process.env.QPDF_PATH
  || path.resolve(ROOT_DIR, '..', 'vendor', 'qpdf', 'qpdf-12.2.0-msvc64', 'bin', 'qpdf.exe');
const PDFIMAGES_PATH = process.env.PDFIMAGES_PATH
  || path.resolve(ROOT_DIR, '..', 'vendor', 'poppler', 'poppler-24.02.0', 'Library', 'bin', 'pdfimages.exe');
const PDFTOHTML_PATH = process.env.PDFTOHTML_PATH
  || path.resolve(ROOT_DIR, '..', 'vendor', 'poppler', 'poppler-24.02.0', 'Library', 'bin', 'pdftohtml.exe');
const PDFTOTEXT_PATH = process.env.PDFTOTEXT_PATH
  || path.resolve(ROOT_DIR, '..', 'vendor', 'poppler', 'poppler-24.02.0', 'Library', 'bin', 'pdftotext.exe');
const LIBREOFFICE_PATH = process.env.LIBREOFFICE_PATH
  || path.resolve(ROOT_DIR, '..', 'vendor', 'libreoffice', 'program', 'soffice.com');
const FFMPEG_PATH = process.env.FFMPEG_PATH
  || path.resolve(ROOT_DIR, '..', 'vendor', 'ffmpeg', 'ffmpeg-8.0-essentials_build', 'bin', 'ffmpeg.exe');
const FFPROBE_PATH = process.env.FFPROBE_PATH
  || path.resolve(ROOT_DIR, '..', 'vendor', 'ffmpeg', 'ffmpeg-8.0-essentials_build', 'bin', 'ffprobe.exe');

const FREE_DAILY_LIMIT = parseInt(process.env.FREE_DAILY_LIMIT || '25', 10);
const FREE_TOOL_DAILY_LIMIT = parseInt(process.env.FREE_TOOL_DAILY_LIMIT || '10', 10);
const ANON_DAILY_LIMIT = parseInt(process.env.ANON_DAILY_LIMIT || '10', 10);
const ANON_TOOL_DAILY_LIMIT = parseInt(process.env.ANON_TOOL_DAILY_LIMIT || '5', 10);
const PREMIUM_DAILY_LIMIT = parseInt(process.env.PREMIUM_DAILY_LIMIT || '9999', 10);

// 🧠 Garantiamo che le cartelle critiche esistano
[TMP_DIR, LOG_DIR, SCHEMAS_DIR, USAGE_DIR].forEach((dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

if (!fs.existsSync(QPDF_PATH)) {
  // eslint-disable-next-line no-console
  console.warn(`⚠️  QPDF non trovato nel percorso: ${QPDF_PATH}. Alcuni tool PDF avanzati non funzioneranno finché non sarà installato.`);
}
if (!fs.existsSync(PDFIMAGES_PATH)) {
  // eslint-disable-next-line no-console
  console.warn(`⚠️  pdfimages (Poppler) non trovato nel percorso: ${PDFIMAGES_PATH}. L'estrazione immagini dai PDF non funzionerà finché non sarà installato.`);
}
if (!fs.existsSync(PDFTOHTML_PATH)) {
  // eslint-disable-next-line no-console
  console.warn(`⚠️  pdftohtml (Poppler) non trovato nel percorso: ${PDFTOHTML_PATH}. La conversione PDF → HTML non funzionerà finché non sarà installato.`);
}
if (!fs.existsSync(PDFTOTEXT_PATH)) {
  // eslint-disable-next-line no-console
  console.warn(`⚠️  pdftotext (Poppler) non trovato nel percorso: ${PDFTOTEXT_PATH}. La conversione PDF → testo avanzato non funzionerà finché non sarà installata.`);
}
if (!fs.existsSync(LIBREOFFICE_PATH)) {
  // eslint-disable-next-line no-console
  console.warn(`⚠️  LibreOffice (soffice) non trovato nel percorso: ${LIBREOFFICE_PATH}. Le conversioni PDF → Word/Excel non funzioneranno finché non sarà installato.`);
}
if (!fs.existsSync(FFMPEG_PATH)) {
  // eslint-disable-next-line no-console
  console.warn(`⚠️  FFmpeg non trovato nel percorso: ${FFMPEG_PATH}. I tool video/audio non funzioneranno finché non sarà installato.`);
}
if (!fs.existsSync(FFPROBE_PATH)) {
  // eslint-disable-next-line no-console
  console.warn(`⚠️  FFprobe non trovato nel percorso: ${FFPROBE_PATH}. L'analisi dei file multimediali non funzionerà finché non sarà installato.`);
}

module.exports = {
  // 🔧 Informazioni progetto
  PROJECT_NAME,

  // 🔧 Path principali
  ROOT_DIR,
  TMP_DIR,
  LOG_DIR,
  REGISTRY_PATH,
  SCHEMAS_DIR,
  USAGE_DIR,
  QPDF_PATH,
  PDFIMAGES_PATH,
  PDFTOHTML_PATH,
  PDFTOTEXT_PATH,
  LIBREOFFICE_PATH,
  FFMPEG_PATH,
  FFPROBE_PATH,

  // 🔧 Configurazioni runtime
  PORT: process.env.PORT || 4000,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  MAX_FILE_SIZE_BYTES: parseInt(process.env.MAX_FILE_SIZE_BYTES || '209715200', 10), // 200 MB default
  TMP_RETENTION_MINUTES: parseInt(process.env.TMP_RETENTION_MINUTES || '60', 10),
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX || '30', 10),
  FREE_DAILY_LIMIT,
  FREE_TOOL_DAILY_LIMIT,
  ANON_DAILY_LIMIT,
  ANON_TOOL_DAILY_LIMIT,
  PREMIUM_DAILY_LIMIT,

  // 🔧 Flag mock/farm
  FARM_MODE: process.env.FARM_MODE || 'mock', // mock | local | farm
  FARM_NODES_CONFIG: process.env.FARM_NODES_CONFIG || path.resolve(ROOT_DIR, 'farm-nodes.json'),
};

