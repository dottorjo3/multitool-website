// 🔧 File: backend/core/usageTracker.js
// 🔗 Tracking utilizzo giornaliero dei tool (mock JSON store)

const fs = require('fs');
const path = require('path');
const db = require('./db');
const {
  USAGE_DIR,
} = require('./config');

const USAGE_FILE = path.resolve(USAGE_DIR, 'usage.json');
const DB_ENABLED = db.enabled && db.pool;

async function bootstrapTable() {
  if (!DB_ENABLED) return;
  try {
    await db.query(
      `CREATE TABLE IF NOT EXISTS tool_usage (
         id SERIAL PRIMARY KEY,
         user_key VARCHAR(255) NOT NULL,
         tool_id VARCHAR(100) NOT NULL,
         usage_date DATE NOT NULL DEFAULT CURRENT_DATE,
         count INTEGER NOT NULL DEFAULT 0,
         UNIQUE (user_key, tool_id, usage_date)
       );`,
      [],
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Errore bootstrap tabella tool_usage:', error.message);
  }
}

if (DB_ENABLED) {
  bootstrapTable().catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Bootstrap tool_usage fallito:', error.message);
  });
}

function loadUsageStore() {
  if (!fs.existsSync(USAGE_FILE)) {
    return null;
  }

  try {
    const raw = fs.readFileSync(USAGE_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

function persistUsageStore(store) {
  fs.writeFileSync(USAGE_FILE, JSON.stringify(store, null, 2), 'utf8');
}

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getUsageStore() {
  const today = getTodayKey();
  const existing = loadUsageStore();

  if (!existing || existing.date !== today) {
    return {
      date: today,
      users: {},
    };
  }

  return existing;
}

function getStatsFor(store, userKey, toolId) {
  const userUsage = store.users[userKey] || { total: 0, tools: {} };
  const perTool = userUsage.tools[toolId] || 0;

  return {
    total: userUsage.total,
    perTool,
  };
}

function getUsageStatsFile(userKey, toolId) {
  const store = getUsageStore();
  return getStatsFor(store, userKey, toolId);
}

function incrementUsageFile(userKey, toolId) {
  const store = getUsageStore();
  if (!store.users[userKey]) {
    store.users[userKey] = { total: 0, tools: {} };
  }

  store.users[userKey].total += 1;
  store.users[userKey].tools[toolId] = (store.users[userKey].tools[toolId] || 0) + 1;

  persistUsageStore(store);

  return {
    total: store.users[userKey].total,
    perTool: store.users[userKey].tools[toolId],
  };
}

async function getUsageStatsDb(userKey, toolId) {
  if (!DB_ENABLED) {
    return getUsageStatsFile(userKey, toolId);
  }

  const today = getTodayKey();
  const totalResult = await db.query(
    `SELECT SUM(count)::int AS total
     FROM tool_usage
     WHERE user_key = $1 AND usage_date = $2`,
    [userKey, today],
  );
  const perToolResult = await db.query(
    `SELECT count::int AS per_tool
     FROM tool_usage
     WHERE user_key = $1 AND usage_date = $2 AND tool_id = $3
     LIMIT 1`,
    [userKey, today, toolId],
  );

  return {
    total: totalResult.rows?.[0]?.total || 0,
    perTool: perToolResult.rows?.[0]?.per_tool || 0,
  };
}

async function incrementUsageDb(userKey, toolId) {
  if (!DB_ENABLED) {
    return incrementUsageFile(userKey, toolId);
  }

  const today = getTodayKey();
  await db.query(
    `INSERT INTO tool_usage (user_key, tool_id, usage_date, count)
     VALUES ($1, $2, $3, 1)
     ON CONFLICT (user_key, tool_id, usage_date)
     DO UPDATE SET count = tool_usage.count + 1`,
    [userKey, toolId, today],
  );

  return getUsageStatsDb(userKey, toolId);
}

function getUsageStats(userKey, toolId) {
  return DB_ENABLED
    ? getUsageStatsDb(userKey, toolId)
    : Promise.resolve(getUsageStatsFile(userKey, toolId));
}

function incrementUsage(userKey, toolId) {
  return DB_ENABLED ? incrementUsageDb(userKey, toolId) : Promise.resolve(incrementUsageFile(userKey, toolId));
}

module.exports = {
  getUsageStats,
  incrementUsage,
};

