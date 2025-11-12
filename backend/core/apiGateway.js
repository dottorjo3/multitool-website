// 🔧 File: backend/core/apiGateway.js
// 🔗 Farm Ready — unico punto di ingresso per tutti i tool

const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const { v4: uuidv4 } = require('uuid');
const rateLimit = require('express-rate-limit');

const { dispatchJob } = require('./farmConnector');
const { localFsAdapter } = require('./storageAdapter');
const { logExecution } = require('./logger');
const { authenticateOptional } = require('./authUtils');
const { getUsageStats, incrementUsage } = require('./usageTracker');
const {
  TMP_DIR,
  MAX_FILE_SIZE_BYTES,
  REGISTRY_PATH,
  SCHEMAS_DIR,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
  FREE_DAILY_LIMIT,
  FREE_TOOL_DAILY_LIMIT,
  ANON_DAILY_LIMIT,
  ANON_TOOL_DAILY_LIMIT,
  PREMIUM_DAILY_LIMIT,
} = require('./config');

const router = express.Router();

// 🧠 Rate limit basilare per evitare abusi
router.use(
  rateLimit({
    windowMs: RATE_LIMIT_WINDOW_MS,
    max: RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

// 🧠 Autenticazione opzionale (se presente token, viene risolto l'utente)
router.use(authenticateOptional);

// 🔧 Configurazione upload (stream verso filesystem locale)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TMP_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
});

// 🔧 Ajv per validare i parametri dei tool
const ajv = new Ajv({ allErrors: true, coerceTypes: true });
addFormats(ajv);

function loadRegistry() {
  const raw = fs.readFileSync(REGISTRY_PATH, 'utf8');
  return JSON.parse(raw);
}

function loadSchema(toolId) {
  const schemaPath = path.resolve(SCHEMAS_DIR, `${toolId}.schema.json`);
  if (!fs.existsSync(schemaPath)) {
    return null;
  }
  const raw = fs.readFileSync(schemaPath, 'utf8');
  return JSON.parse(raw);
}

router.get('/', (req, res) => {
  const tools = loadRegistry();
  res.json(tools);
});

router.get('/:toolId', (req, res) => {
  const tools = loadRegistry();
  const tool = tools.find((item) => item.id === req.params.toolId);
  if (!tool) {
    return res.status(404).json({ error: 'Tool non trovato' });
  }
  return res.json(tool);
});

router.post('/:toolId/run', upload.any(), async (req, res) => {
  const { toolId } = req.params;
  const tools = loadRegistry();
  const tool = tools.find((item) => item.id === toolId);

  if (!tool) {
    return res.status(404).json({ error: 'Tool non trovato' });
  }

  const user = req.user || null;
  const isPremiumTool = tool.free === false;

  if (isPremiumTool && !user) {
    return res.status(401).json({
      error: 'Autenticazione richiesta',
      details: 'Effettua il login per usare questo tool premium',
    });
  }

  if (isPremiumTool && user && !user.premium) {
    return res.status(402).json({
      error: 'Tool premium',
      details: 'Aggiorna il tuo piano per sbloccare questo tool',
      planRequired: 'premium',
    });
  }

  const userKey = user ? `user:${user.id}` : `ip:${req.ip}`;
  const isPremiumUser = req.user?.premium;
  const freeTools = tools.filter((item) => item.free !== false);
  const toolCount = freeTools.length || 1;
  const baseTotal = isPremiumUser ? PREMIUM_DAILY_LIMIT : user ? FREE_DAILY_LIMIT : ANON_DAILY_LIMIT;
  const basePerTool = isPremiumUser ? PREMIUM_DAILY_LIMIT : user ? FREE_TOOL_DAILY_LIMIT : ANON_TOOL_DAILY_LIMIT;
  const usageLimits = {
    total: Math.min(baseTotal * Math.max(1, toolCount / 20), PREMIUM_DAILY_LIMIT),
    perTool: Math.min(basePerTool, Math.max(5, Math.floor(toolCount / 4))),
  };

  const currentUsage = await getUsageStats(userKey, toolId);

  if (!isPremiumUser) {
    if (usageLimits.total && currentUsage.total >= usageLimits.total) {
      return res.status(429).json({
        error: 'Limite giornaliero raggiunto',
        details: `Hai raggiunto il limite giornaliero di ${usageLimits.total} esecuzioni.`,
        limits: {
          total: usageLimits.total,
          perTool: usageLimits.perTool,
          usage: currentUsage,
        },
      });
    }

    if (usageLimits.perTool && currentUsage.perTool >= usageLimits.perTool) {
      return res.status(429).json({
        error: 'Limite tool raggiunto',
        details: `Hai raggiunto il limite giornaliero di ${usageLimits.perTool} esecuzioni per questo tool.`,
        limits: {
          total: usageLimits.total,
          perTool: usageLimits.perTool,
          usage: currentUsage,
        },
      });
    }
  }

  const usageSnapshot = await incrementUsage(userKey, toolId);

  const schema = loadSchema(toolId);
  if (!schema) {
    return res.status(500).json({ error: 'Schema del tool mancante' });
  }

  const validate = ajv.compile(schema);

  const params = req.body;
  if (!validate(params)) {
    return res.status(400).json({
      error: 'Parametri non validi',
      details: validate.errors,
    });
  }

  const requestId = uuidv4();
  const userId = req.user?.id || 'anon';

  logExecution({
    requestId,
    userId,
    tool: toolId,
    status: 'started',
  });

  try {
    const filesMeta = [];

    for (const file of req.files || []) {
      filesMeta.push({
        originalName: file.originalname,
        filePath: file.path,
        mimetype: file.mimetype,
        size: file.size,
      });
    }

    // 🔧 Carichiamo la logica del tool (Node.js)
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const toolRunner = require(path.resolve(__dirname, '..', 'tools', `${toolId}.js`));

    const result = await toolRunner.run({
      params,
      filesMeta,
      requestId,
      userId,
      helpers: { dispatchJob, localFsAdapter },
    });

    logExecution({
      requestId,
      userId,
      tool: toolId,
      status: 'success',
      durationMs: result?.durationMs || null,
      outputSizeBytes: result?.outputSizeBytes || null,
    });

    return res.json({
      requestId,
      toolId,
      result,
      usage: {
        total: usageSnapshot.total,
        perTool: usageSnapshot.perTool,
        limits: usageLimits,
        premium: !!user?.premium,
      },
    });
  } catch (error) {
    logExecution({
      requestId,
      userId,
      tool: toolId,
      status: 'error',
      error: error.message,
    });

    return res.status(500).json({
      error: 'Tool execution failed',
      details: error.message,
    });
  } finally {
    for (const file of req.files || []) {
      await localFsAdapter.remove(file.path);
    }
  }
});

module.exports = router;

