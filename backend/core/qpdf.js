// 🔧 File: backend/core/qpdf.js
// 🔗 Farm Ready — wrapper per eseguire il binario qpdf

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const {
  QPDF_PATH,
  PDFIMAGES_PATH,
  PDFTOHTML_PATH,
  PDFTOTEXT_PATH,
  LIBREOFFICE_PATH,
  TMP_DIR,
} = require('./config');
const { log } = require('./logger');

function ensureQpdfAvailable() {
  if (!fs.existsSync(QPDF_PATH)) {
    throw new Error(`QPDF non trovato nel percorso configurato: ${QPDF_PATH}`);
  }
}

function runQpdf(args, { cwd = TMP_DIR } = {}) {
  ensureQpdfAvailable();

  return new Promise((resolve, reject) => {
    const child = spawn(QPDF_PATH, args, {
      cwd,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stderr = '';

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('error', (error) => {
      reject(error);
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        log('qpdf fallito', { level: 'error', args, stderr });
        reject(new Error(stderr.trim() || `qpdf exited with code ${code}`));
      }
    });
  });
}

function buildTempPath(requestId, suffix, extension = '.pdf') {
  return path.resolve(TMP_DIR, `${requestId}-${suffix}${extension}`);
}

module.exports = {
  runQpdf,
  buildTempPath,
  QPDF_PATH,
  PDFIMAGES_PATH,
  PDFTOHTML_PATH,
  PDFTOTEXT_PATH,
  LIBREOFFICE_PATH,
};

