// 🔧 File: backend/core/storageAdapter.js
// 🔗 Farm Ready — gestione storage (filesystem locale + stub S3)

const fs = require('fs');
const path = require('path');
const { TMP_DIR } = require('./config');
const { log } = require('./logger');

// 🔧 Adapter: filesystem locale
const localFsAdapter = {
  async save({ buffer, originalName, requestId }) {
    const extension = path.extname(originalName);
    const fileName = `${requestId}${extension}`;
    const filePath = path.resolve(TMP_DIR, fileName);

    fs.writeFileSync(filePath, buffer);

    return { filePath, fileName };
  },
  async getStream(filePath) {
    return fs.createReadStream(filePath);
  },
  async remove(filePath) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  },
};

// 🧠 Adapter S3 (stub) — verrà completato quando abiliteremo DO Spaces / AWS
const s3Adapter = {
  async save() {
    log('s3Adapter.save chiamato — implementazione mancante', { level: 'warn' });
    throw new Error('S3 adapter non configurato');
  },
};

module.exports = {
  localFsAdapter,
  s3Adapter,
};

