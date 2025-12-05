#!/usr/bin/env node
// 🔧 Script per verificare completezza tool

const fs = require('fs');
const path = require('path');

const REGISTRY_PATH = path.join(__dirname, '..', 'backend', 'db', 'tools_registry.json');
const BACKEND_TOOLS_DIR = path.join(__dirname, '..', 'backend', 'tools');
const SCHEMAS_DIR = path.join(__dirname, '..', 'backend', 'tools', 'schemas');
const FRONTEND_TOOLS_DIR = path.join(__dirname, '..', 'frontend', 'src', 'tools');
const FRONTEND_INDEX = path.join(__dirname, '..', 'frontend', 'src', 'tools', 'index.js');

function main() {
  console.log('🔍 Verifica completezza tool...\n');

  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
  const frontendIndex = fs.readFileSync(FRONTEND_INDEX, 'utf8');

  const originalCats = ['text', 'developer', 'data', 'security', 'math', 'pdf', 'image', 'audio', 'video', 'ai'];
  const tools = registry.filter(t => originalCats.includes(t.category));

  let complete = 0;
  let missingBackend = 0;
  let missingSchema = 0;
  let missingFrontend = 0;
  let missingIndex = 0;
  const issues = [];

  tools.forEach(tool => {
    const hasBackend = fs.existsSync(path.join(BACKEND_TOOLS_DIR, `${tool.id}.js`));
    const hasSchema = fs.existsSync(path.join(SCHEMAS_DIR, `${tool.id}.schema.json`));
    const hasFrontend = fs.existsSync(path.join(FRONTEND_TOOLS_DIR, tool.id, 'index.jsx'));
    const hasIndex = frontendIndex.includes(`'${tool.id}':`);

    if (!hasBackend) {
      missingBackend++;
      issues.push({ tool: tool.id, issue: 'Backend mancante' });
    }
    if (!hasSchema) {
      missingSchema++;
      if (!issues.find(i => i.tool === tool.id)) {
        issues.push({ tool: tool.id, issue: 'Schema mancante' });
      }
    }
    if (!hasFrontend) {
      missingFrontend++;
      if (!issues.find(i => i.tool === tool.id)) {
        issues.push({ tool: tool.id, issue: 'Frontend mancante' });
      }
    }
    if (!hasIndex) {
      missingIndex++;
      if (!issues.find(i => i.tool === tool.id)) {
        issues.push({ tool: tool.id, issue: 'Frontend index mancante' });
      }
    }

    if (hasBackend && hasSchema && hasFrontend && hasIndex) {
      complete++;
    }
  });

  console.log('='.repeat(60));
  console.log('📊 STATISTICHE COMPLETEZZA');
  console.log('='.repeat(60));
  console.log(`Tool totali: ${tools.length}`);
  console.log(`Tool completi: ${complete} (${Math.round(complete / tools.length * 100)}%)`);
  console.log(`\nMancanze:`);
  console.log(`  Backend: ${missingBackend}`);
  console.log(`  Schema: ${missingSchema}`);
  console.log(`  Frontend: ${missingFrontend}`);
  console.log(`  Frontend Index: ${missingIndex}`);
  console.log('='.repeat(60));

  if (issues.length > 0 && issues.length <= 20) {
    console.log('\n⚠️  Tool con problemi (primi 20):');
    issues.slice(0, 20).forEach(i => {
      console.log(`  - ${i.tool}: ${i.issue}`);
    });
  } else if (issues.length > 20) {
    console.log(`\n⚠️  ${issues.length} tool con problemi (troppi per mostrare)`);
  }

  console.log('\n' + (complete === tools.length ? '✅ TUTTI I TOOL SONO COMPLETI!' : '⚠️  Alcuni tool necessitano completamento'));
}

main();


