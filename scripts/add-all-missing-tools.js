#!/usr/bin/env node
// 🔧 Script per aggiungere TUTTI i tool mancanti al registry

const fs = require('fs');
const path = require('path');

const REGISTRY_PATH = path.join(__dirname, '..', 'backend', 'db', 'tools_registry.json');
const TOOLS_DIR = path.join(__dirname, '..', 'backend', 'tools');

function getCategoryFromId(id) {
  if (id.startsWith('text-')) return 'text';
  if (id.startsWith('developer-') || id === 'base64-encode' || id === 'base64-decode' || id === 'url-encode' || id === 'url-decode' || id === 'html-encode' || id === 'html-decode') return 'developer';
  if (id.startsWith('data-')) return 'data';
  if (id.startsWith('security-')) return 'security';
  if (id.startsWith('math-')) return 'math';
  if (id.startsWith('pdf-')) return 'pdf';
  if (id.startsWith('image-')) return 'image';
  if (id.startsWith('audio-')) return 'audio';
  if (id.startsWith('video-')) return 'video';
  if (id.startsWith('ai-')) return 'ai';
  return 'other';
}

function getNameFromId(id) {
  const parts = id.split('-');
  const name = parts.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return name || id;
}

function getDescription(id, category) {
  const name = getNameFromId(id);
  if (category === 'math') return `${name} - Mathematical calculator or utility`;
  if (category === 'audio') return `${name} - Audio processing and manipulation tool`;
  if (category === 'video') return `${name} - Video processing and manipulation tool`;
  if (category === 'image') return `${name} - Image processing and manipulation tool`;
  return `${name} tool`;
}

function getInputType(id, category) {
  if (category === 'audio' || category === 'video' || category === 'image' || category === 'pdf') {
    return 'file';
  }
  if (id.includes('calculator') || id.includes('converter') || id.includes('generator')) {
    return 'form';
  }
  return 'form';
}

function getOutputType(id, category) {
  if (category === 'audio' || category === 'video' || category === 'image' || category === 'pdf') {
    return 'file';
  }
  if (id.includes('calculator') || id.includes('statistics') || id.includes('metadata')) {
    return 'json';
  }
  return 'json';
}

function main() {
  console.log('🔍 Aggiunta TUTTI i tool mancanti al registry...\n');

  // Leggi registry
  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
  const existingIds = new Set(registry.map(t => t.id));

  // Trova tutti i file tool nel backend
  const allToolFiles = fs.readdirSync(TOOLS_DIR)
    .filter(f => f.endsWith('.js') && f !== 'example-tool.js')
    .map(f => f.replace('.js', ''))
    .filter(id => {
      // Escludi tool speciali/non-standard
      const exclude = ['dashboard-brief', 'lake-governance', 'pipeline-blueprint', 'quality-audit', 
                       'retention-planner', 'sandbox-setup', 'source-catalog', 'brief', 'governance',
                       'livestream-checklist', 'caption-translator', 'b-roll-planner', 'podcast-showrunner'];
      return !exclude.some(ex => id.includes(ex));
    });

  // Filtra solo tool della lista originale (categorie standard)
  const originalCategories = ['text', 'developer', 'data', 'security', 'math', 'pdf', 'image', 'audio', 'video', 'ai'];
  const missingTools = allToolFiles.filter(id => {
    if (existingIds.has(id)) return false;
    const category = getCategoryFromId(id);
    return originalCategories.includes(category);
  });

  console.log(`Tool backend totali: ${allToolFiles.length}`);
  console.log(`Tool mancanti da aggiungere: ${missingTools.length}\n`);

  let added = 0;
  const byCategory = {};

  missingTools.forEach(toolId => {
    const category = getCategoryFromId(toolId);
    if (!byCategory[category]) byCategory[category] = 0;

    const name = getNameFromId(toolId);
    const description = getDescription(toolId, category);
    const inputType = getInputType(toolId, category);
    const outputType = getOutputType(toolId, category);

    // Aggiungi al registry
    registry.push({
      id: toolId,
      name: name,
      category: category,
      free: true, // Default free, può essere cambiato dopo
      description: description,
      languages: ['en', 'it'],
      inputType: inputType,
      outputType: outputType,
    });

    console.log(`✅ ${toolId}: Aggiunto (${category})`);
    byCategory[category]++;
    added++;
  });

  // Salva registry
  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + '\n');

  console.log('\n' + '='.repeat(50));
  console.log('📊 RIEPILOGO:');
  console.log('='.repeat(50));
  console.log(`Aggiunti: ${added}`);
  console.log('\nPer categoria:');
  Object.entries(byCategory).forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count}`);
  });
  console.log(`\nTotale nel registry: ${registry.length}`);
  console.log('='.repeat(50));

  if (added > 0) {
    console.log('\n✅ Registry aggiornato con successo!');
  }
}

main();


