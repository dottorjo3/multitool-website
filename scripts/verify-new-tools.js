#!/usr/bin/env node
// 🔧 Script di verifica tool nuovi (audio, video, PDF)

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BACKEND_TOOLS = path.join(ROOT, 'backend', 'tools');
const FRONTEND_TOOLS = path.join(ROOT, 'frontend', 'src', 'tools');
const SCHEMAS = path.join(BACKEND_TOOLS, 'schemas');
const REGISTRY = path.join(ROOT, 'backend', 'db', 'tools_registry.json');
const FRONTEND_INDEX = path.join(FRONTEND_TOOLS, 'index.js');

const TOOLS_TO_VERIFY = [
  // Audio
  'audio-convert',
  'audio-trim',
  'audio-merge',
  'audio-compress',
  'audio-normalize',
  // Video
  'video-merge',
  'video-split',
  'video-rotate',
  'video-mute',
  // PDF
  'pdf-compare',
  'pdf-images-to-pdf',
  'pdf-crop',
  'pdf-flatten',
];

function checkFile(filePath, toolId, type) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ ${toolId}: ${type} mancante - ${filePath}`);
    return false;
  }
  console.log(`✅ ${toolId}: ${type} presente`);
  return true;
}

function checkRegistry(toolId, registry) {
  const found = registry.find(t => t.id === toolId);
  if (!found) {
    console.error(`❌ ${toolId}: Non presente nel registry backend`);
    return false;
  }
  console.log(`✅ ${toolId}: Presente nel registry backend`);
  return true;
}

function checkFrontendIndex(toolId, content) {
  const regex = new RegExp(`['"]${toolId}['"]`, 'g');
  if (!regex.test(content)) {
    console.error(`❌ ${toolId}: Non presente nel frontend index.js`);
    return false;
  }
  console.log(`✅ ${toolId}: Presente nel frontend index.js`);
  return true;
}

function main() {
  console.log('🔍 Verifica tool nuovi...\n');

  // Leggi registry
  let registry = [];
  try {
    const registryContent = fs.readFileSync(REGISTRY, 'utf8');
    registry = JSON.parse(registryContent);
  } catch (error) {
    console.error(`❌ Errore lettura registry: ${error.message}`);
    process.exit(1);
  }

  // Leggi frontend index
  let frontendIndexContent = '';
  try {
    frontendIndexContent = fs.readFileSync(FRONTEND_INDEX, 'utf8');
  } catch (error) {
    console.error(`❌ Errore lettura frontend index: ${error.message}`);
    process.exit(1);
  }

  let allOk = true;
  const results = {
    backend: 0,
    frontend: 0,
    schemas: 0,
    registry: 0,
    frontendIndex: 0,
  };

  TOOLS_TO_VERIFY.forEach(toolId => {
    console.log(`\n📦 ${toolId}:`);

    // Backend
    const backendFile = path.join(BACKEND_TOOLS, `${toolId}.js`);
    if (checkFile(backendFile, toolId, 'Backend')) {
      results.backend++;
    } else {
      allOk = false;
    }

    // Frontend
    const frontendDir = path.join(FRONTEND_TOOLS, toolId);
    const frontendFile = path.join(frontendDir, 'index.jsx');
    if (checkFile(frontendFile, toolId, 'Frontend')) {
      results.frontend++;
    } else {
      allOk = false;
    }

    // Schema
    const schemaFile = path.join(SCHEMAS, `${toolId}.schema.json`);
    if (checkFile(schemaFile, toolId, 'Schema')) {
      results.schemas++;
    } else {
      allOk = false;
    }

    // Registry
    if (checkRegistry(toolId, registry)) {
      results.registry++;
    } else {
      allOk = false;
    }

    // Frontend Index
    if (checkFrontendIndex(toolId, frontendIndexContent)) {
      results.frontendIndex++;
    } else {
      allOk = false;
    }
  });

  // Riepilogo
  console.log('\n' + '='.repeat(50));
  console.log('📊 RIEPILOGO:');
  console.log('='.repeat(50));
  console.log(`Backend:      ${results.backend}/${TOOLS_TO_VERIFY.length}`);
  console.log(`Frontend:     ${results.frontend}/${TOOLS_TO_VERIFY.length}`);
  console.log(`Schemas:      ${results.schemas}/${TOOLS_TO_VERIFY.length}`);
  console.log(`Registry:     ${results.registry}/${TOOLS_TO_VERIFY.length}`);
  console.log(`Frontend IDX: ${results.frontendIndex}/${TOOLS_TO_VERIFY.length}`);
  console.log('='.repeat(50));

  if (allOk) {
    console.log('\n✅ Tutti i tool sono completi e corretti!');
    process.exit(0);
  } else {
    console.log('\n❌ Alcuni tool hanno problemi. Controlla gli errori sopra.');
    process.exit(1);
  }
}

main();


