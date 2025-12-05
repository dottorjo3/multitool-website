#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO_DIR = path.resolve(__dirname, '..');

console.log('🔍 Verifica stato repository...\n');

function runCommand(cmd, returnOutput = false) {
  try {
    const output = execSync(cmd, { 
      cwd: REPO_DIR, 
      encoding: 'utf8',
      stdio: returnOutput ? 'pipe' : 'inherit'
    });
    return { success: true, output: returnOutput ? output : null };
  } catch (error) {
    return { success: false, error: error.message, output: returnOutput ? error.stdout : null };
  }
}

// Conta file tool
console.log('📊 Conteggio file...');
const toolFiles = fs.readdirSync(path.join(REPO_DIR, 'backend/tools')).filter(f => f.endsWith('.js')).length;
const schemaFiles = fs.readdirSync(path.join(REPO_DIR, 'backend/tools/schemas')).filter(f => f.endsWith('.schema.json')).length;
const frontendTools = fs.readdirSync(path.join(REPO_DIR, 'frontend/src/tools')).filter(f => 
  fs.statSync(path.join(REPO_DIR, 'frontend/src/tools', f)).isDirectory()
).length;

console.log(`  Tool backend: ${toolFiles}`);
console.log(`  Schemas: ${schemaFiles}`);
console.log(`  Frontend tools: ${frontendTools}`);
console.log('');

// Verifica file non tracciati
console.log('🔍 File non tracciati da git...');
const untracked = runCommand('git ls-files --others --exclude-standard', true);
if (untracked.success && untracked.output && untracked.output.trim()) {
  const count = untracked.output.trim().split('\n').filter(l => l.trim()).length;
  console.log(`  ✅ Trovati ${count} file non tracciati\n`);
  console.log('  Prime 10 file:');
  untracked.output.trim().split('\n').slice(0, 10).forEach(f => console.log(`    - ${f}`));
  console.log('');
} else {
  console.log('  ℹ️  Nessun file non tracciati trovato\n');
}

// Verifica modifiche
console.log('🔍 File modificati...');
const modified = runCommand('git diff --name-only HEAD', true);
if (modified.success && modified.output && modified.output.trim()) {
  const count = modified.output.trim().split('\n').filter(l => l.trim()).length;
  console.log(`  ✅ Trovati ${count} file modificati\n`);
} else {
  console.log('  ℹ️  Nessun file modificato trovato\n');
}

// Verifica staging
console.log('🔍 File nello staging...');
const staged = runCommand('git diff --cached --name-only', true);
if (staged.success && staged.output && staged.output.trim()) {
  const count = staged.output.trim().split('\n').filter(l => l.trim()).length;
  console.log(`  ✅ Trovati ${count} file nello staging\n`);
} else {
  console.log('  ℹ️  Nessun file nello staging\n');
}

// Stato generale
console.log('📋 Stato generale:');
const status = runCommand('git status --short', true);
if (status.success) {
  if (status.output && status.output.trim()) {
    const lines = status.output.trim().split('\n').filter(l => l.trim());
    console.log(`  Trovate ${lines.length} modifiche totali\n`);
    if (lines.length > 0) {
      console.log('  Prime 10:');
      lines.slice(0, 10).forEach(l => console.log(`    ${l}`));
    }
  } else {
    console.log('  ✅ Working tree pulito - tutto già committato\n');
  }
}

console.log('\n💡 Prossimi passi:');
console.log('');
console.log('1. Aggiungi tutti i file: git add .');
console.log('2. Crea commit: git commit -m "Messaggio"');
console.log('3. Push: git push origin main');
console.log('');

