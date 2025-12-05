#!/usr/bin/env node
// 🔧 Script per verificare che tutti i tool siano completi

const fs = require('fs');
const path = require('path');

const REGISTRY_PATH = path.join(__dirname, '..', 'backend', 'db', 'tools_registry.json');
const BACKEND_TOOLS_DIR = path.join(__dirname, '..', 'backend', 'tools');
const BACKEND_SCHEMAS_DIR = path.join(__dirname, '..', 'backend', 'tools', 'schemas');
const FRONTEND_TOOLS_DIR = path.join(__dirname, '..', 'frontend', 'src', 'tools');
const FRONTEND_INDEX_PATH = path.join(__dirname, '..', 'frontend', 'src', 'tools', 'index.js');

const originalCategories = ['text', 'developer', 'data', 'security', 'math', 'pdf', 'image', 'audio', 'video', 'ai'];

function main() {
  console.log('🔍 Verifica completamento tool...\n');

  // Leggi registry
  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
  const originalTools = registry.filter(t => originalCategories.includes(t.category));

  const stats = {
    total: originalTools.length,
    complete: 0,
    missingBackend: [],
    missingSchema: [],
    missingFrontend: [],
    missingFrontendIndex: [],
  };

  // Leggi frontend index
  const frontendIndexContent = fs.readFileSync(FRONTEND_INDEX_PATH, 'utf8');

  originalTools.forEach(tool => {
    const toolId = tool.id;
    let isComplete = true;

    // Verifica backend
    const backendPath = path.join(BACKEND_TOOLS_DIR, `${toolId}.js`);
    if (!fs.existsSync(backendPath)) {
      stats.missingBackend.push(toolId);
      isComplete = false;
    }

    // Verifica schema
    const schemaPath = path.join(BACKEND_SCHEMAS_DIR, `${toolId}.schema.json`);
    if (!fs.existsSync(schemaPath)) {
      stats.missingSchema.push(toolId);
      isComplete = false;
    }

    // Verifica frontend
    const frontendPath = path.join(FRONTEND_TOOLS_DIR, toolId);
    if (!fs.existsSync(frontendPath)) {
      stats.missingFrontend.push(toolId);
      isComplete = false;
    }

    // Verifica frontend index
    const importPattern = `'${toolId}': () => import`;
    if (!frontendIndexContent.includes(importPattern)) {
      stats.missingFrontendIndex.push(toolId);
      isComplete = false;
    }

    if (isComplete) {
      stats.complete++;
    }
  });

  // Stampa risultati
  console.log('='.repeat(60));
  console.log('📊 STATISTICHE COMPLETAMENTO');
  console.log('='.repeat(60));
  console.log(`Totale tool lista originale: ${stats.total}`);
  console.log(`Tool completi: ${stats.complete} (${Math.round(stats.complete / stats.total * 100)}%)`);
  console.log(`\nTool mancanti backend: ${stats.missingBackend.length}`);
  console.log(`Tool mancanti schema: ${stats.missingSchema.length}`);
  console.log(`Tool mancanti frontend: ${stats.missingFrontend.length}`);
  console.log(`Tool mancanti frontend index: ${stats.missingFrontendIndex.length}`);
  console.log('='.repeat(60));

  // Dettagli per categoria
  const byCategory = {};
  originalTools.forEach(tool => {
    const cat = tool.category;
    if (!byCategory[cat]) {
      byCategory[cat] = { total: 0, complete: 0, missing: { backend: 0, schema: 0, frontend: 0, index: 0 } };
    }
    byCategory[cat].total++;

    if (stats.missingBackend.includes(tool.id)) byCategory[cat].missing.backend++;
    if (stats.missingSchema.includes(tool.id)) byCategory[cat].missing.schema++;
    if (stats.missingFrontend.includes(tool.id)) byCategory[cat].missing.frontend++;
    if (stats.missingFrontendIndex.includes(tool.id)) byCategory[cat].missing.index++;

    if (!stats.missingBackend.includes(tool.id) &&
        !stats.missingSchema.includes(tool.id) &&
        !stats.missingFrontend.includes(tool.id) &&
        !stats.missingFrontendIndex.includes(tool.id)) {
      byCategory[cat].complete++;
    }
  });

  console.log('\n📋 DETTAGLI PER CATEGORIA:');
  console.log('='.repeat(60));
  Object.entries(byCategory).forEach(([cat, stat]) => {
    const pct = Math.round(stat.complete / stat.total * 100);
    console.log(`\n${cat.toUpperCase()}: ${stat.complete}/${stat.total} (${pct}%)`);
    if (stat.missing.backend > 0) console.log(`  ⚠️  Backend mancanti: ${stat.missing.backend}`);
    if (stat.missing.schema > 0) console.log(`  ⚠️  Schema mancanti: ${stat.missing.schema}`);
    if (stat.missing.frontend > 0) console.log(`  ⚠️  Frontend mancanti: ${stat.missing.frontend}`);
    if (stat.missing.index > 0) console.log(`  ⚠️  Frontend index mancanti: ${stat.missing.index}`);
  });

  // Lista tool mancanti (primi 20)
  if (stats.missingBackend.length > 0) {
    console.log('\n⚠️  Tool mancanti BACKEND (primi 20):');
    stats.missingBackend.slice(0, 20).forEach(id => console.log(`  - ${id}`));
    if (stats.missingBackend.length > 20) console.log(`  ... e altri ${stats.missingBackend.length - 20}`);
  }

  if (stats.missingSchema.length > 0) {
    console.log('\n⚠️  Tool mancanti SCHEMA (primi 20):');
    stats.missingSchema.slice(0, 20).forEach(id => console.log(`  - ${id}`));
    if (stats.missingSchema.length > 20) console.log(`  ... e altri ${stats.missingSchema.length - 20}`);
  }

  if (stats.missingFrontend.length > 0) {
    console.log('\n⚠️  Tool mancanti FRONTEND (primi 20):');
    stats.missingFrontend.slice(0, 20).forEach(id => console.log(`  - ${id}`));
    if (stats.missingFrontend.length > 20) console.log(`  ... e altri ${stats.missingFrontend.length - 20}`);
  }

  if (stats.missingFrontendIndex.length > 0) {
    console.log('\n⚠️  Tool mancanti FRONTEND INDEX (primi 20):');
    stats.missingFrontendIndex.slice(0, 20).forEach(id => console.log(`  - ${id}`));
    if (stats.missingFrontendIndex.length > 20) console.log(`  ... e altri ${stats.missingFrontendIndex.length - 20}`);
  }

  console.log('\n' + '='.repeat(60));
  if (stats.complete === stats.total) {
    console.log('✅ TUTTI I TOOL SONO COMPLETI!');
  } else {
    console.log(`⚠️  Mancano ancora ${stats.total - stats.complete} tool completi`);
  }
  console.log('='.repeat(60));
}

main();

