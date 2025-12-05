#!/usr/bin/env node
// 🔧 Script per aggiungere tool mancanti al registry frontend

const fs = require('fs');
const path = require('path');

const FRONTEND_TOOLS_DIR = path.join(__dirname, '..', 'frontend', 'src', 'tools');
const FRONTEND_INDEX_FILE = path.join(FRONTEND_TOOLS_DIR, 'index.js');

function main() {
  console.log('🔍 Aggiunta tool mancanti al registry frontend...\n');

  // Trova tutte le directory tool
  const toolDirs = fs.readdirSync(FRONTEND_TOOLS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory() && d.name !== 'example-tool')
    .map(d => d.name)
    .sort();

  // Leggi index.js
  let indexContent = fs.readFileSync(FRONTEND_INDEX_FILE, 'utf8');

  // Trova tool mancanti
  const missing = toolDirs.filter(toolId => !indexContent.includes(`'${toolId}':`));

  if (missing.length === 0) {
    console.log('✅ Tutti i tool sono già presenti nel registry!');
    return;
  }

  console.log(`Tool da aggiungere: ${missing.length}\n`);

  // Trova la posizione per inserire (prima della chiusura dell'oggetto registry)
  const closingBraceIndex = indexContent.lastIndexOf('};');
  
  if (closingBraceIndex === -1) {
    console.error('❌ Impossibile trovare la chiusura del registry object');
    return;
  }

  // Genera le righe da aggiungere
  const entriesToAdd = missing.map(toolId => {
    return `  '${toolId}': () => import('./${toolId}/index.jsx'),`;
  }).join('\n');

  // Inserisci prima della chiusura
  const newContent = 
    indexContent.slice(0, closingBraceIndex) +
    (indexContent[closingBraceIndex - 1] !== '\n' ? '\n' : '') +
    entriesToAdd + '\n' +
    indexContent.slice(closingBraceIndex);

  // Salva
  fs.writeFileSync(FRONTEND_INDEX_FILE, newContent);

  console.log('✅ Tool aggiunti al registry:');
  missing.forEach(toolId => console.log(`   - ${toolId}`));
  console.log(`\n📊 Totale aggiunto: ${missing.length}`);
}

main();


