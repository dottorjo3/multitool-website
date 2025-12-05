#!/usr/bin/env node
// 🔧 Script per aggiungere tool mancanti al registry

const fs = require('fs');
const path = require('path');

const REGISTRY_PATH = path.join(__dirname, '..', 'backend', 'db', 'tools_registry.json');
const TOOLS_DIR = path.join(__dirname, '..', 'backend', 'tools');

// 🔧 Definizioni Security Tools da aggiungere
const SECURITY_TOOLS = [
  { id: 'security-aes-encrypt', name: 'AES Encrypt', description: 'Encrypt text using AES encryption', free: true },
  { id: 'security-aes-decrypt', name: 'AES Decrypt', description: 'Decrypt AES encrypted text', free: true },
  { id: 'security-bcrypt-hash', name: 'BCrypt Hash', description: 'Hash password using BCrypt', free: true },
  { id: 'security-bcrypt-verify', name: 'BCrypt Verify', description: 'Verify password against BCrypt hash', free: true },
  { id: 'security-argon2-hash', name: 'Argon2 Hash', description: 'Hash password using Argon2', free: true },
  { id: 'security-argon2-verify', name: 'Argon2 Verify', description: 'Verify password against Argon2 hash', free: true },
  { id: 'security-pbkdf2-hash', name: 'PBKDF2 Hash', description: 'Hash password using PBKDF2', free: true },
  { id: 'security-scrypt-hash', name: 'Scrypt Hash', description: 'Hash password using Scrypt', free: true },
  { id: 'security-password-strength-checker', name: 'Password Strength Checker', description: 'Check password strength and security', free: true },
  { id: 'security-random-key-generator', name: 'Random Key Generator', description: 'Generate secure random keys', free: true },
  { id: 'security-hash-file', name: 'Hash File', description: 'Calculate hash of a file (MD5, SHA256, etc.)', free: true },
  { id: 'security-hash-compare', name: 'Hash Compare', description: 'Compare two hashes', free: true },
  { id: 'security-hmac-file', name: 'HMAC File', description: 'Generate HMAC for a file', free: true },
  { id: 'security-hex-encode', name: 'Hex Encode', description: 'Encode text to hexadecimal', free: true },
  { id: 'security-hex-decode', name: 'Hex Decode', description: 'Decode hexadecimal to text', free: true },
  { id: 'security-base64url-encode', name: 'Base64URL Encode', description: 'Encode text to Base64URL', free: true },
  { id: 'security-base64url-decode', name: 'Base64URL Decode', description: 'Decode Base64URL to text', free: true },
  { id: 'security-text-encrypt', name: 'Text Encrypt', description: 'Encrypt text with various algorithms', free: true },
  { id: 'security-text-decrypt', name: 'Text Decrypt', description: 'Decrypt encrypted text', free: true },
  { id: 'security-rot13-encoder', name: 'ROT13 Encoder', description: 'Encode/decode text with ROT13', free: true },
  { id: 'security-jwt-decoder', name: 'JWT Decoder', description: 'Decode and verify JWT tokens', free: true },
  { id: 'security-crc32-calculator', name: 'CRC32 Calculator', description: 'Calculate CRC32 checksum', free: true },
];

function main() {
  console.log('🔍 Aggiunta Security Tools al registry...\n');

  // Leggi registry
  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
  const existingIds = new Set(registry.map(t => t.id));

  let added = 0;
  let skipped = 0;

  SECURITY_TOOLS.forEach(tool => {
    // Verifica se esiste file backend
    const backendFile = path.join(TOOLS_DIR, `${tool.id}.js`);
    if (!fs.existsSync(backendFile)) {
      console.log(`⚠️  ${tool.id}: File backend non trovato, skip`);
      skipped++;
      return;
    }

    // Verifica se già presente
    if (existingIds.has(tool.id)) {
      console.log(`⏭️  ${tool.id}: Già presente nel registry`);
      skipped++;
      return;
    }

    // Aggiungi al registry
    registry.push({
      id: tool.id,
      name: tool.name,
      category: 'security',
      free: tool.free,
      description: tool.description,
      languages: ['en', 'it'],
      inputType: tool.id.includes('file') || tool.id.includes('hash-file') || tool.id.includes('hmac-file') ? 'file' : 'form',
      outputType: 'json',
    });

    console.log(`✅ ${tool.id}: Aggiunto al registry`);
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


