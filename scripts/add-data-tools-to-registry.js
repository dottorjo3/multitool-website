#!/usr/bin/env node
// 🔧 Script per aggiungere Data Tools mancanti al registry

const fs = require('fs');
const path = require('path');

const REGISTRY_PATH = path.join(__dirname, '..', 'backend', 'db', 'tools_registry.json');
const TOOLS_DIR = path.join(__dirname, '..', 'backend', 'tools');

// 🔧 Lista Data Tools (escludendo tool "speciali" come dashboard-brief, etc.)
const DATA_TOOL_NAMES = {
  'data-csv-sort': 'CSV Sort',
  'data-csv-filter': 'CSV Filter',
  'data-csv-transpose': 'CSV Transpose',
  'data-csv-remove-duplicates': 'CSV Remove Duplicates',
  'data-csv-statistics': 'CSV Statistics',
  'data-csv-add-column': 'CSV Add Column',
  'data-csv-remove-column': 'CSV Remove Column',
  'data-csv-rename-columns': 'CSV Rename Columns',
  'data-csv-merge-columns': 'CSV Merge Columns',
  'data-csv-split-by-column': 'CSV Split by Column',
  'data-csv-validator': 'CSV Validator',
  'data-csv-normalize': 'CSV Normalize',
  'data-csv-to-excel': 'CSV to Excel',
  'data-json-path-extractor': 'JSON Path Extractor',
  'data-json-flatten': 'JSON Flatten',
  'data-json-unflatten': 'JSON Unflatten',
  'data-json-merge': 'JSON Merge',
  'data-json-sort-keys': 'JSON Sort Keys',
  'data-json-remove-keys': 'JSON Remove Keys',
  'data-json-pick-keys': 'JSON Pick Keys',
  'data-json-compare': 'JSON Compare',
  'data-json-validate-schema': 'JSON Validate Schema',
  'data-json-transform': 'JSON Transform',
  'data-json-array-operations': 'JSON Array Operations',
  'data-json-table-viewer': 'JSON Table Viewer',
  'data-yaml-to-json': 'YAML to JSON',
  'data-json-to-yaml': 'JSON to YAML',
  'data-xml-to-json': 'XML to JSON',
  'data-json-to-xml': 'JSON to XML',
  'data-excel-to-json': 'Excel to JSON',
  'data-excel-to-csv': 'Excel to CSV',
  'data-data-format-converter': 'Data Format Converter',
};

function getDescription(id) {
  const name = DATA_TOOL_NAMES[id];
  if (!name) return 'Data processing tool';
  
  if (id.includes('csv')) {
    return `${name} - Process and manipulate CSV files`;
  } else if (id.includes('json')) {
    return `${name} - Process and manipulate JSON data`;
  } else if (id.includes('yaml')) {
    return `${name} - Convert between YAML and JSON`;
  } else if (id.includes('xml')) {
    return `${name} - Convert between XML and JSON`;
  } else if (id.includes('excel')) {
    return `${name} - Convert Excel files`;
  } else {
    return `${name} - Data format conversion tool`;
  }
}

function main() {
  console.log('🔍 Aggiunta Data Tools al registry...\n');

  // Leggi registry
  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
  const existingIds = new Set(registry.map(t => t.id));

  // Trova tutti i file data-* nel backend
  const dataFiles = fs.readdirSync(TOOLS_DIR)
    .filter(f => f.startsWith('data-') && f.endsWith('.js'))
    .map(f => f.replace('.js', ''))
    .filter(id => 
      !id.includes('dashboard') && 
      !id.includes('brief') && 
      !id.includes('lake') && 
      !id.includes('pipeline') && 
      !id.includes('quality') && 
      !id.includes('retention') && 
      !id.includes('sandbox') && 
      !id.includes('source') && 
      !id.includes('governance')
    );

  let added = 0;
  let skipped = 0;

  dataFiles.forEach(toolId => {
    // Verifica se già presente
    if (existingIds.has(toolId)) {
      console.log(`⏭️  ${toolId}: Già presente nel registry`);
      skipped++;
      return;
    }

    const name = DATA_TOOL_NAMES[toolId] || toolId.split('-').slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const description = getDescription(toolId);
    
    // Determina inputType
    let inputType = 'form';
    if (toolId.includes('csv') || toolId.includes('excel') || toolId.includes('json-to-xml') || toolId.includes('json-to-yaml')) {
      inputType = 'file';
    }

    // Aggiungi al registry
    registry.push({
      id: toolId,
      name: name,
      category: 'data',
      free: true,
      description: description,
      languages: ['en', 'it'],
      inputType: inputType,
      outputType: toolId.includes('viewer') || toolId.includes('statistics') ? 'json' : inputType === 'file' ? 'file' : 'json',
    });

    console.log(`✅ ${toolId}: Aggiunto al registry`);
    added++;
  });

  // Salva registry
  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + '\n');

  console.log('\n' + '='.repeat(50));
  console.log('📊 RIEPILOGO:');
  console.log('='.repeat(50));
  console.log(`Aggiunti: ${added}`);
  console.log(`Skip: ${skipped}`);
  console.log(`Totale nel registry: ${registry.length}`);
  console.log('='.repeat(50));

  if (added > 0) {
    console.log('\n✅ Registry aggiornato con successo!');
  }
}

main();


