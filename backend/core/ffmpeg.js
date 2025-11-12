// 🔧 File: backend/core/ffmpeg.js
// 🔗 Farm Ready — wrapper per eseguire FFmpeg / FFprobe

const { spawn } = require('child_process');
const fs = require('fs');
const {
  FFMPEG_PATH,
  FFPROBE_PATH,
  TMP_DIR,
} = require('./config');
const { log } = require('./logger');

function ensureBinaryAvailable(binaryPath, label) {
  if (!fs.existsSync(binaryPath)) {
    throw new Error(`${label} non trovato nel percorso configurato: ${binaryPath}`);
  }
}

function runCommand(binaryPath, args, { cwd = TMP_DIR, captureStdout = false } = {}) {
  ensureBinaryAvailable(binaryPath, binaryPath.includes('ffprobe') ? 'FFprobe' : 'FFmpeg');

  return new Promise((resolve, reject) => {
    const collectedStdout = captureStdout ? [] : null;
    const collectedStderr = [];

    const child = spawn(binaryPath, args, {
      cwd,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    if (captureStdout) {
      child.stdout.on('data', (chunk) => {
        collectedStdout.push(chunk);
      });
    } else {
      child.stdout.resume();
    }

    child.stderr.on('data', (chunk) => {
      collectedStderr.push(chunk);
    });

    child.on('error', (error) => {
      reject(error);
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve({
          stdout: captureStdout ? Buffer.concat(collectedStdout).toString() : null,
        });
      } else {
        const stderr = Buffer.concat(collectedStderr).toString();
        log('ffmpeg command failed', {
          level: 'error',
          binaryPath,
          args,
          stderr,
        });
        reject(new Error(stderr.trim() || `FFmpeg exited with code ${code}`));
      }
    });
  });
}

function runFfmpeg(args, options = {}) {
  return runCommand(FFMPEG_PATH, args, { ...options, captureStdout: false });
}

function runFfprobe(args, options = {}) {
  return runCommand(FFPROBE_PATH, args, { ...options, captureStdout: true });
}

module.exports = {
  runFfmpeg,
  runFfprobe,
  FFMPEG_PATH,
  FFPROBE_PATH,
};

