// 🔧 File: backend/core/farmConnector.js
// 🔗 Farm Ready — ponte tra API Gateway e AI Farm (mock/local/farm)

const fs = require('fs');
const path = require('path');
const { FARM_MODE, FARM_NODES_CONFIG } = require('./config');
const { log } = require('./logger');

let farmNodes = [];

try {
  if (fs.existsSync(FARM_NODES_CONFIG)) {
    const raw = fs.readFileSync(FARM_NODES_CONFIG, 'utf8');
    farmNodes = JSON.parse(raw);
  }
} catch (error) {
  log('Impossibile caricare farm-nodes.json', { level: 'warn', error: error.message });
}

/**
 * 🔧 Seleziona il nodo più adatto in base al tipo di tool.
 * Per ora è una selezione molto semplice.
 */
function selectNode(toolId) {
  if (!farmNodes.length) {
    return null;
  }

  if (toolId.startsWith('ai-')) {
    return farmNodes.find((node) => node.role === 'main') || farmNodes[0];
  }

  if (toolId.includes('video')) {
    return farmNodes.find((node) => node.role === 'worker') || farmNodes[0];
  }

  return farmNodes[0];
}

/**
 * 🔧 Esegue il job secondo la modalità attiva (mock/local/farm).
 */
async function dispatchJob({ toolId, params, filesMeta }) {
  const node = selectNode(toolId);

  log('Dispatch job', {
    toolId,
    mode: FARM_MODE,
    node: node ? node.id : 'local',
  });

  if (FARM_MODE === 'farm' && node) {
    // 🧠 Qui integreremo la chiamata HTTP/WebSocket verso il nodo selezionato.
    throw new Error('Farm mode non ancora implementato');
  }

  if (FARM_MODE === 'local') {
    const localWorkerPath = path.resolve(__dirname, '..', 'workers', `${toolId}.worker.js`);
    if (!fs.existsSync(localWorkerPath)) {
      throw new Error(`Worker locale non trovato per il tool ${toolId}`);
    }
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const worker = require(localWorkerPath);
    return worker.run({ params, filesMeta });
  }

  // 🧠 MOCK: risponde direttamente (usato per tool Node.js lato server)
  return { params, filesMeta, mode: 'mock' };
}

module.exports = {
  dispatchJob,
};

