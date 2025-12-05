#!/usr/bin/env node
// 🔧 Script per generare schemas per Security Tools

const fs = require('fs');
const path = require('path');

const SECURITY_TOOLS_DIR = path.join(__dirname, '..', 'backend', 'tools');
const SCHEMAS_DIR = path.join(__dirname, '..', 'backend', 'tools', 'schemas');

const securityTools = [
  'security-aes-encrypt',
  'security-aes-decrypt',
  'security-bcrypt-hash',
  'security-bcrypt-verify',
  'security-argon2-hash',
  'security-argon2-verify',
  'security-pbkdf2-hash',
  'security-scrypt-hash',
  'security-password-strength-checker',
  'security-random-key-generator',
  'security-hash-file',
  'security-hash-compare',
  'security-hmac-file',
  'security-hex-encode',
  'security-hex-decode',
  'security-base64url-encode',
  'security-base64url-decode',
  'security-text-encrypt',
  'security-text-decrypt',
  'security-rot13-encoder',
  'security-jwt-decoder',
  'security-crc32-calculator',
];

// Schema templates basati su pattern comuni
const schemaTemplates = {
  'security-aes-encrypt': {
    properties: {
      text: { type: 'string', minLength: 1, errorMessage: 'Inserisci testo da crittografare' },
      password: { type: 'string', minLength: 1, errorMessage: 'Inserisci password per crittografia' },
      algorithm: { type: 'string', enum: ['aes-256-cbc'], default: 'aes-256-cbc' },
    },
    required: ['text', 'password'],
  },
  'security-aes-decrypt': {
    properties: {
      encrypted: { type: 'string', minLength: 1, errorMessage: 'Inserisci testo crittografato' },
      password: { type: 'string', minLength: 1, errorMessage: 'Inserisci password per decrittografia' },
    },
    required: ['encrypted', 'password'],
  },
  'security-bcrypt-hash': {
    properties: {
      password: { type: 'string', minLength: 1, errorMessage: 'Inserisci password da hashare' },
      saltRounds: { type: ['number', 'string'], minimum: 4, maximum: 15, default: 10 },
    },
    required: ['password'],
  },
  'security-bcrypt-verify': {
    properties: {
      password: { type: 'string', minLength: 1, errorMessage: 'Inserisci password da verificare' },
      hash: { type: 'string', minLength: 1, errorMessage: 'Inserisci hash bcrypt' },
    },
    required: ['password', 'hash'],
  },
  'security-argon2-hash': {
    properties: {
      password: { type: 'string', minLength: 1, errorMessage: 'Inserisci password da hashare' },
      type: { type: 'string', enum: ['argon2id', 'argon2i', 'argon2d'], default: 'argon2id' },
    },
    required: ['password'],
  },
  'security-argon2-verify': {
    properties: {
      password: { type: 'string', minLength: 1, errorMessage: 'Inserisci password da verificare' },
      hash: { type: 'string', minLength: 1, errorMessage: 'Inserisci hash argon2' },
    },
    required: ['password', 'hash'],
  },
  'security-pbkdf2-hash': {
    properties: {
      password: { type: 'string', minLength: 1, errorMessage: 'Inserisci password da hashare' },
      saltRounds: { type: ['number', 'string'], minimum: 1000, maximum: 100000, default: 10000 },
    },
    required: ['password'],
  },
  'security-scrypt-hash': {
    properties: {
      password: { type: 'string', minLength: 1, errorMessage: 'Inserisci password da hashare' },
      saltRounds: { type: ['number', 'string'], minimum: 1000, maximum: 100000, default: 16384 },
    },
    required: ['password'],
  },
  'security-password-strength-checker': {
    properties: {
      password: { type: 'string', minLength: 1, errorMessage: 'Inserisci password da analizzare' },
    },
    required: ['password'],
  },
  'security-random-key-generator': {
    properties: {
      length: { type: ['number', 'string'], minimum: 16, maximum: 256, default: 32 },
      encoding: { type: 'string', enum: ['hex', 'base64', 'base64url'], default: 'hex' },
    },
    required: [],
  },
  'security-hash-file': {
    properties: {
      algorithm: { type: 'string', enum: ['md5', 'sha1', 'sha256', 'sha512'], default: 'sha256' },
    },
    required: [],
  },
  'security-hash-compare': {
    properties: {
      hash1: { type: 'string', minLength: 1, errorMessage: 'Inserisci primo hash' },
      hash2: { type: 'string', minLength: 1, errorMessage: 'Inserisci secondo hash' },
    },
    required: ['hash1', 'hash2'],
  },
  'security-hmac-file': {
    properties: {
      secret: { type: 'string', minLength: 1, errorMessage: 'Inserisci secret key' },
      algorithm: { type: 'string', enum: ['sha256', 'sha512'], default: 'sha256' },
    },
    required: ['secret'],
  },
  'security-hex-encode': {
    properties: {
      text: { type: 'string', minLength: 1, errorMessage: 'Inserisci testo da codificare' },
    },
    required: ['text'],
  },
  'security-hex-decode': {
    properties: {
      hex: { type: 'string', minLength: 1, errorMessage: 'Inserisci esadecimale da decodificare' },
    },
    required: ['hex'],
  },
  'security-base64url-encode': {
    properties: {
      text: { type: 'string', minLength: 1, errorMessage: 'Inserisci testo da codificare' },
    },
    required: ['text'],
  },
  'security-base64url-decode': {
    properties: {
      base64url: { type: 'string', minLength: 1, errorMessage: 'Inserisci Base64URL da decodificare' },
    },
    required: ['base64url'],
  },
  'security-text-encrypt': {
    properties: {
      text: { type: 'string', minLength: 1, errorMessage: 'Inserisci testo da crittografare' },
      password: { type: 'string', minLength: 1, errorMessage: 'Inserisci password' },
      algorithm: { type: 'string', enum: ['aes-256-cbc'], default: 'aes-256-cbc' },
    },
    required: ['text', 'password'],
  },
  'security-text-decrypt': {
    properties: {
      encrypted: { type: 'string', minLength: 1, errorMessage: 'Inserisci testo crittografato' },
      password: { type: 'string', minLength: 1, errorMessage: 'Inserisci password' },
    },
    required: ['encrypted', 'password'],
  },
  'security-rot13-encoder': {
    properties: {
      text: { type: 'string', minLength: 1, errorMessage: 'Inserisci testo da codificare/decodificare' },
    },
    required: ['text'],
  },
  'security-jwt-decoder': {
    properties: {
      token: { type: 'string', minLength: 1, errorMessage: 'Inserisci JWT token' },
    },
    required: ['token'],
  },
  'security-crc32-calculator': {
    properties: {
      data: { type: 'string', minLength: 1, errorMessage: 'Inserisci dati per calcolare CRC32' },
    },
    required: ['data'],
  },
};

function generateSchema(toolId) {
  const template = schemaTemplates[toolId];
  if (!template) {
    console.log(`⚠️  Nessun template per ${toolId}`);
    return null;
  }

  const schema = {
    $id: `${toolId}.schema.json`,
    type: 'object',
    properties: template.properties,
    required: template.required,
    additionalProperties: false,
  };

  return JSON.stringify(schema, null, 2) + '\n';
}

function main() {
  console.log('🔧 Generazione schemas per Security Tools...\n');

  let created = 0;
  let skipped = 0;

  securityTools.forEach(toolId => {
    const schemaPath = path.join(SCHEMAS_DIR, `${toolId}.schema.json`);

    if (fs.existsSync(schemaPath)) {
      console.log(`⏭️  ${toolId}: Schema già presente`);
      skipped++;
      return;
    }

    const schema = generateSchema(toolId);
    if (!schema) {
      skipped++;
      return;
    }

    fs.writeFileSync(schemaPath, schema);
    console.log(`✅ ${toolId}: Schema creato`);
    created++;
  });

  console.log('\n' + '='.repeat(50));
  console.log(`Creati: ${created}`);
  console.log(`Skip: ${skipped}`);
  console.log('='.repeat(50));
}

main();

