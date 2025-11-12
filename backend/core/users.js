// 🔧 File: backend/core/users.js
// 🔗 Mock user store condiviso (sostituire con database reale in produzione)

const fs = require('fs');
const path = require('path');
const db = require('./db');
const { USAGE_DIR } = require('./config');

const TOKENS_FILE = path.resolve(USAGE_DIR, 'tokens.json');

const SEED_USERS = [
  {
    id: 1,
    email: 'test@bibble.local',
    password: 'password',
    name: 'Test User',
    premium: false,
    plan: 'free',
  },
  {
    id: 2,
    email: 'demo@bibble.local',
    password: 'demo123',
    name: 'Demo User',
    premium: true,
    plan: 'premium',
  },
];

const DB_ENABLED = db.enabled;

async function ensureSeedUsers() {
  if (!DB_ENABLED || !db.pool) {
    return;
  }

  try {
    const countResult = await db.query('SELECT COUNT(*)::int AS total FROM users', []);
    const totalUsers = countResult.rows?.[0]?.total || 0;
    if (totalUsers > 0) {
      return;
    }

    // Inserisce utenti demo
    // eslint-disable-next-line no-restricted-syntax
    for (const user of SEED_USERS) {
      // eslint-disable-next-line no-await-in-loop
      const inserted = await db.query(
        `INSERT INTO users (email, name, password_hash, premium)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
         RETURNING id`,
        [user.email, user.name, user.password, user.premium],
      );

      const userId = inserted.rows?.[0]?.id
        ? inserted.rows[0].id
        : (
          await db.query('SELECT id FROM users WHERE email = $1 LIMIT 1', [user.email])
        ).rows?.[0]?.id;

      if (user.plan && user.plan !== 'free' && userId) {
        const existingSub = await db.query(
          'SELECT id FROM subscriptions WHERE user_id = $1 AND status = \'active\' LIMIT 1',
          [userId],
        );
        if (!existingSub.rows.length) {
        // eslint-disable-next-line no-await-in-loop
        await db.query(
            `INSERT INTO subscriptions (user_id, plan, status)
             VALUES ($1, $2, 'active')`,
            [userId, user.plan],
          );
        }
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Errore seed utenti demo:', error.message);
  }
}

if (DB_ENABLED) {
  ensureSeedUsers().catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Bootstrap utenti fallito:', error.message);
  });
}

function mapRowToUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    password: row.password_hash,
    premium: !!row.is_premium,
    plan: row.plan || (row.is_premium ? 'premium' : 'free'),
    subscriptionStatus: row.subscription_status || (row.is_premium ? 'active' : 'inactive'),
  };
}

function toPublicUser(user) {
  if (!user) return null;
  const { password, ...safe } = user;
  return safe;
}

async function findByEmailAndPassword(email, password) {
  if (DB_ENABLED) {
    await ensureSeedUsers();
    const result = await db.query(
      `SELECT
         u.id,
         u.email,
         u.name,
         u.password_hash,
         COALESCE(s.plan, CASE WHEN u.premium THEN 'premium' ELSE 'free' END) AS plan,
         CASE
           WHEN s.plan = 'premium' AND s.status = 'active' THEN TRUE
           ELSE u.premium
         END AS is_premium,
         COALESCE(s.status, CASE WHEN u.premium THEN 'active' ELSE 'inactive' END) AS subscription_status
       FROM users u
       LEFT JOIN LATERAL (
         SELECT plan, status
         FROM subscriptions
         WHERE user_id = u.id
         ORDER BY start_date DESC NULLS LAST, created_at DESC NULLS LAST, id DESC
         LIMIT 1
       ) s ON TRUE
       WHERE u.email = $1
       LIMIT 1`,
      [email],
    );
    const row = result.rows[0];
    if (!row) {
      return null;
    }
    if (row.password_hash !== password) {
      return null;
    }
    return mapRowToUser(row);
  }
  return MEMORY_USERS.find((user) => user.email === email && user.password === password) || null;
}

async function getUserById(id) {
  if (DB_ENABLED) {
    await ensureSeedUsers();
    const result = await db.query(
      `SELECT
         u.id,
         u.email,
         u.name,
         u.password_hash,
         COALESCE(s.plan, CASE WHEN u.premium THEN 'premium' ELSE 'free' END) AS plan,
         CASE
           WHEN s.plan = 'premium' AND s.status = 'active' THEN TRUE
           ELSE u.premium
         END AS is_premium,
         COALESCE(s.status, CASE WHEN u.premium THEN 'active' ELSE 'inactive' END) AS subscription_status
       FROM users u
       LEFT JOIN LATERAL (
         SELECT plan, status
         FROM subscriptions
         WHERE user_id = u.id
         ORDER BY start_date DESC NULLS LAST, created_at DESC NULLS LAST, id DESC
         LIMIT 1
       ) s ON TRUE
       WHERE u.id = $1
       LIMIT 1`,
      [id],
    );
    return mapRowToUser(result.rows[0]);
  }
  return MEMORY_USERS.find((user) => user.id === Number(id)) || null;
}

async function getFirstUser() {
  if (DB_ENABLED) {
    await ensureSeedUsers();
    const result = await db.query(
      `SELECT
         u.id,
         u.email,
         u.name,
         u.password_hash,
         COALESCE(s.plan, CASE WHEN u.premium THEN 'premium' ELSE 'free' END) AS plan,
         CASE
           WHEN s.plan = 'premium' AND s.status = 'active' THEN TRUE
           ELSE u.premium
         END AS is_premium,
         COALESCE(s.status, CASE WHEN u.premium THEN 'active' ELSE 'inactive' END) AS subscription_status
       FROM users u
       LEFT JOIN LATERAL (
         SELECT plan, status
         FROM subscriptions
         WHERE user_id = u.id
         ORDER BY start_date DESC NULLS LAST, created_at DESC NULLS LAST, id DESC
         LIMIT 1
       ) s ON TRUE
       ORDER BY u.id ASC
       LIMIT 1`,
      [],
    );
    return mapRowToUser(result.rows[0]);
  }
  return MEMORY_USERS[0];
}

function loadTokens() {
  try {
    if (!fs.existsSync(TOKENS_FILE)) {
      return {};
    }
    const raw = fs.readFileSync(TOKENS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    return {};
  }
}

function persistTokens(store) {
  fs.writeFileSync(TOKENS_FILE, JSON.stringify(store, null, 2), 'utf8');
}

function storeTokenPair(userId, refreshToken) {
  const store = loadTokens();
  store[userId] = { refreshToken };
  persistTokens(store);
  return store[userId];
}

function getTokenPair(userId) {
  const store = loadTokens();
  return store[userId] || null;
}

function removeTokenPair(userId, refreshToken) {
  const store = loadTokens();
  if (!store[userId]) {
    return;
  }

  if (!refreshToken || store[userId].refreshToken === refreshToken) {
    delete store[userId];
    persistTokens(store);
  }
}

module.exports = {
  toPublicUser,
  findByEmailAndPassword,
  getUserById,
  getFirstUser,
  ensureSeedUsers,
  storeTokenPair,
  getTokenPair,
  removeTokenPair,
  DB_ENABLED,
  MEMORY_USERS: SEED_USERS,
};
