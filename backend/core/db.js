// 🔧 File: backend/core/db.js
// 🔗 Gestione connessione PostgreSQL (fallback a null se non configurato)

const { Pool } = require('pg');
const { log } = require('./logger');

const DATABASE_URL = process.env.DATABASE_URL;

let pool = null;

if (DATABASE_URL) {
  try {
    pool = new Pool({
      connectionString: DATABASE_URL,
      ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : undefined,
      max: Number(process.env.PG_POOL_MAX || 5),
      idleTimeoutMillis: Number(process.env.PG_IDLE_TIMEOUT || 30000),
    });

    pool.on('error', (error) => {
      log('Errore connessione database', { level: 'error', error: error.message });
    });

    log('Connessione database inizializzata', { level: 'info' });
  } catch (error) {
    log('Impossibile inizializzare la connessione PostgreSQL', { level: 'error', error: error.message });
    pool = null;
  }
}

async function query(text, params) {
  if (!pool) {
    throw new Error('Database non configurato');
  }
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

module.exports = pool
  ? { pool, query, enabled: true }
  : { pool: null, query: null, enabled: false };


