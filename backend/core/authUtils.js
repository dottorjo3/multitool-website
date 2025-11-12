// 🔧 File: backend/core/authUtils.js
// 🔗 Utility per token JWT e middleware autenticazione

const jwt = require('jsonwebtoken');
const { getUserById, toPublicUser } = require('./users');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

function generateToken(payload, options = {}) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d', ...options });
}

function decodeToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

async function authenticateOptional(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.substring(7);

  try {
    const decoded = decodeToken(token);
    const user = await getUserById(decoded.id);
    if (user) {
      req.user = toPublicUser(user);
    }
  } catch (error) {
    req.authError = error;
  }

  return next();
}

function ensureAuthenticated(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      error: 'Autenticazione richiesta',
      details: 'Accedi per continuare',
    });
  }
  return next();
}

function ensurePremium(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      error: 'Autenticazione richiesta',
      details: 'Accedi per utilizzare questo tool premium',
    });
  }

  if (!req.user.premium) {
    return res.status(402).json({
      error: 'Tool premium',
      details: 'Questo tool è riservato agli utenti premium',
    });
  }

  return next();
}

module.exports = {
  JWT_SECRET,
  generateToken,
  decodeToken,
  authenticateOptional,
  ensureAuthenticated,
  ensurePremium,
};

