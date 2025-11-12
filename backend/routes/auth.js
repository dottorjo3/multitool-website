const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { generateToken, decodeToken } = require('../core/authUtils');
const {
  findByEmailAndPassword,
  getUserById,
  getFirstUser,
  toPublicUser,
  storeTokenPair,
  getTokenPair,
  removeTokenPair,
} = require('../core/users');

router.use(bodyParser.json());

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await findByEmailAndPassword(email, password);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken({ id: user.id, email: user.email });
    const refreshToken = generateToken({ id: user.id, email: user.email }, { expiresIn: '30d' });

    storeTokenPair(user.id, refreshToken);

    res.json({
      token,
      refreshToken,
      user: toPublicUser(user),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
});

// POST /api/auth/restore-demo-user
// Endpoint utile per ripristino rapido: crea il demo user e ritorna token
router.post('/restore-demo-user', async (req, res) => {
  try {
    const user = await getFirstUser();

    const token = generateToken({ id: user.id, email: user.email });
    const refreshToken = generateToken({ id: user.id, email: user.email }, { expiresIn: '30d' });

    storeTokenPair(user.id, refreshToken);

    res.json({
      token,
      refreshToken,
      user: toPublicUser(user),
      message: 'Demo user restored successfully'
    });
  } catch (error) {
    console.error('Restore demo user error:', error);
    res.status(500).json({ error: 'Failed to restore demo user', details: error.message });
  }
});

// POST /api/auth/register (per implementazione futura)
router.post('/register', (req, res) => {
  res.status(501).json({ error: 'Registration not yet implemented' });
});

router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token mancante' });
  }

  try {
    const decoded = decodeToken(refreshToken);
    const pair = await getTokenPair(decoded.id);

    if (!pair || pair.refreshToken !== refreshToken) {
      return res.status(401).json({ error: 'Refresh token non valido' });
    }

    const user = await getUserById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newAccessToken = generateToken({ id: user.id, email: user.email });
    const newRefreshToken = generateToken({ id: user.id, email: user.email }, { expiresIn: '30d' });

    storeTokenPair(user.id, newRefreshToken);

    return res.json({
      token: newAccessToken,
      refreshToken: newRefreshToken,
      user: toPublicUser(user),
    });
  } catch (error) {
    return res.status(401).json({ error: 'Refresh token non valido', details: error.message });
  }
});

// GET /api/auth/me (verifica token)
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7);
    const decoded = decodeToken(token);
    
    const user = await getUserById(decoded.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: toPublicUser(user),
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token', details: error.message });
  }
});

router.post('/logout', async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token mancante' });
  }

  try {
    const decoded = decodeToken(refreshToken);
    await removeTokenPair(decoded.id, refreshToken);
    return res.json({ success: true });
  } catch (error) {
    return res.status(400).json({ error: 'Token non valido', details: error.message });
  }
});

module.exports = router;

