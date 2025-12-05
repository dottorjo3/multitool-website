#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO_DIR = path.resolve(__dirname, '..');

console.log('🔍 Verifica stato repository Git...\n');

function runCommand(cmd, returnOutput = true) {
  try {
    const output = execSync(cmd, { 
      cwd: REPO_DIR, 
      encoding: 'utf8',
      stdio: returnOutput ? 'pipe' : 'inherit'
    });
    return { success: true, output: returnOutput ? output.trim() : null };
  } catch (error) {
    return { 
      success: false, 
      error: error.message,
      output: returnOutput ? (error.stdout || error.stderr || '').trim() : null
    };
  }
}

// 1. Verifica stato
console.log('1️⃣ Verifica stato repository...');
const status = runCommand('git status --short');
if (status.success && status.output) {
  console.log('  File modificati/nuovi:');
  status.output.split('\n').slice(0, 5).forEach(line => {
    if (line.trim()) console.log(`    ${line}`);
  });
  if (status.output.split('\n').length > 5) {
    console.log(`    ... e altri file`);
  }
} else if (status.success) {
  console.log('  ✅ Nessuna modifica da committare\n');
} else {
  console.log('  ⚠️  Errore nel controllo stato\n');
}
console.log('');

// 2. Verifica commit locali
console.log('2️⃣ Ultimi commit locali...');
const localCommits = runCommand('git log --oneline -5');
if (localCommits.success && localCommits.output) {
  localCommits.output.split('\n').forEach(line => {
    console.log(`    ${line}`);
  });
}
console.log('');

// 3. Verifica commit su GitHub
console.log('3️⃣ Fetch da GitHub...');
runCommand('git fetch origin', false);
console.log('');

// 4. Verifica differenze
console.log('4️⃣ Commit locali non su GitHub...');
const ahead = runCommand('git log origin/main..HEAD --oneline');
if (ahead.success && ahead.output) {
  const commits = ahead.output.split('\n').filter(l => l.trim());
  if (commits.length > 0) {
    console.log(`  ✅ ${commits.length} commit locale/i da pushatre:\n`);
    commits.forEach(line => console.log(`    ${line}`));
    console.log('\n  🚀 PRONTO PER IL PUSH!\n');
  } else {
    console.log('  ℹ️  Nessun commit locale da pushatre\n');
  }
} else {
  console.log('  ℹ️  Impossibile verificare\n');
}

// 5. Verifica se ci sono commit su GitHub non locali
console.log('5️⃣ Commit su GitHub non locali...');
const behind = runCommand('git log HEAD..origin/main --oneline');
if (behind.success && behind.output) {
  const commits = behind.output.split('\n').filter(l => l.trim());
  if (commits.length > 0) {
    console.log(`  ⚠️  ${commits.length} commit su GitHub non presenti localmente:\n`);
    commits.forEach(line => console.log(`    ${line}`));
    console.log('\n  💡 Potrebbe essere necessario fare pull prima del push\n');
  } else {
    console.log('  ✅ Repository locale è aggiornato\n');
  }
}

// 6. Riepilogo
console.log('='.repeat(50));
console.log('\n📋 RIEPILOGO:\n');
console.log('Per aggiornare GitHub, esegui:\n');
console.log('  git push origin main\n');
console.log('Se ci sono conflitti, fai prima:\n');
console.log('  git pull origin main --allow-unrelated-histories');
console.log('  git push origin main\n');
console.log('='.repeat(50));
console.log('');

