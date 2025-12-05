#!/usr/bin/env node
// 🔧 Script per generare frontend components per Security Tools

const fs = require('fs');
const path = require('path');

const FRONTEND_TOOLS_DIR = path.join(__dirname, '..', 'frontend', 'src', 'tools');

const securityTools = [
  { id: 'security-aes-encrypt', name: 'AES Encrypt', fields: ['text', 'password'], fileInput: false },
  { id: 'security-aes-decrypt', name: 'AES Decrypt', fields: ['encrypted', 'password'], fileInput: false },
  { id: 'security-bcrypt-hash', name: 'BCrypt Hash', fields: ['password', 'saltRounds'], fileInput: false },
  { id: 'security-bcrypt-verify', name: 'BCrypt Verify', fields: ['password', 'hash'], fileInput: false },
  { id: 'security-argon2-hash', name: 'Argon2 Hash', fields: ['password', 'type'], fileInput: false },
  { id: 'security-argon2-verify', name: 'Argon2 Verify', fields: ['password', 'hash'], fileInput: false },
  { id: 'security-pbkdf2-hash', name: 'PBKDF2 Hash', fields: ['password', 'saltRounds'], fileInput: false },
  { id: 'security-scrypt-hash', name: 'Scrypt Hash', fields: ['password', 'saltRounds'], fileInput: false },
  { id: 'security-password-strength-checker', name: 'Password Strength Checker', fields: ['password'], fileInput: false },
  { id: 'security-random-key-generator', name: 'Random Key Generator', fields: ['length', 'encoding'], fileInput: false },
  { id: 'security-hash-file', name: 'Hash File', fields: ['algorithm'], fileInput: true },
  { id: 'security-hash-compare', name: 'Hash Compare', fields: ['hash1', 'hash2'], fileInput: false },
  { id: 'security-hmac-file', name: 'HMAC File', fields: ['secret', 'algorithm'], fileInput: true },
  { id: 'security-hex-encode', name: 'Hex Encode', fields: ['text'], fileInput: false },
  { id: 'security-hex-decode', name: 'Hex Decode', fields: ['hex'], fileInput: false },
  { id: 'security-base64url-encode', name: 'Base64URL Encode', fields: ['text'], fileInput: false },
  { id: 'security-base64url-decode', name: 'Base64URL Decode', fields: ['base64url'], fileInput: false },
  { id: 'security-text-encrypt', name: 'Text Encrypt', fields: ['text', 'password'], fileInput: false },
  { id: 'security-text-decrypt', name: 'Text Decrypt', fields: ['encrypted', 'password'], fileInput: false },
  { id: 'security-rot13-encoder', name: 'ROT13 Encoder', fields: ['text'], fileInput: false },
  { id: 'security-jwt-decoder', name: 'JWT Decoder', fields: ['token'], fileInput: false },
  { id: 'security-crc32-calculator', name: 'CRC32 Calculator', fields: ['data'], fileInput: false },
];

function generateFieldConfig(tool) {
  const fieldConfigs = {
    text: {
      type: 'textarea',
      name: 'text',
      label: 'Testo',
      placeholder: 'Inserisci il testo...',
      required: true,
      rows: 6,
    },
    encrypted: {
      type: 'textarea',
      name: 'encrypted',
      label: 'Testo crittografato',
      placeholder: 'Inserisci il testo crittografato...',
      required: true,
      rows: 6,
    },
    password: {
      type: 'text',
      name: 'password',
      label: 'Password',
      placeholder: 'Inserisci la password...',
      required: true,
    },
    hash: {
      type: 'textarea',
      name: 'hash',
      label: 'Hash',
      placeholder: 'Inserisci l\'hash...',
      required: true,
      rows: 4,
    },
    hash1: {
      type: 'text',
      name: 'hash1',
      label: 'Primo hash',
      placeholder: 'Inserisci il primo hash...',
      required: true,
    },
    hash2: {
      type: 'text',
      name: 'hash2',
      label: 'Secondo hash',
      placeholder: 'Inserisci il secondo hash...',
      required: true,
    },
    saltRounds: {
      type: 'number',
      name: 'saltRounds',
      label: 'Salt rounds',
      defaultValue: 10,
      min: 4,
      max: 15,
      helperText: 'Numero di round (4-15 per bcrypt, 1000-100000 per pbkdf2/scrypt)',
    },
    type: {
      type: 'select',
      name: 'type',
      label: 'Tipo Argon2',
      defaultValue: 'argon2id',
      options: [
        { value: 'argon2id', label: 'Argon2id (consigliato)' },
        { value: 'argon2i', label: 'Argon2i' },
        { value: 'argon2d', label: 'Argon2d' },
      ],
    },
    length: {
      type: 'number',
      name: 'length',
      label: 'Lunghezza chiave',
      defaultValue: 32,
      min: 16,
      max: 256,
      helperText: 'Lunghezza della chiave in caratteri (16-256)',
    },
    encoding: {
      type: 'select',
      name: 'encoding',
      label: 'Encoding',
      defaultValue: 'hex',
      options: [
        { value: 'hex', label: 'Hexadecimal' },
        { value: 'base64', label: 'Base64' },
        { value: 'base64url', label: 'Base64URL' },
      ],
    },
    algorithm: {
      type: 'select',
      name: 'algorithm',
      label: 'Algoritmo',
      defaultValue: 'sha256',
      options: [
        { value: 'md5', label: 'MD5' },
        { value: 'sha1', label: 'SHA1' },
        { value: 'sha256', label: 'SHA256' },
        { value: 'sha512', label: 'SHA512' },
      ],
    },
    secret: {
      type: 'text',
      name: 'secret',
      label: 'Secret Key',
      placeholder: 'Inserisci la chiave segreta...',
      required: true,
    },
    hex: {
      type: 'textarea',
      name: 'hex',
      label: 'Hexadecimal',
      placeholder: 'Inserisci il valore esadecimale...',
      required: true,
      rows: 4,
    },
    base64url: {
      type: 'textarea',
      name: 'base64url',
      label: 'Base64URL',
      placeholder: 'Inserisci il valore Base64URL...',
      required: true,
      rows: 4,
    },
    token: {
      type: 'textarea',
      name: 'token',
      label: 'JWT Token',
      placeholder: 'Inserisci il JWT token...',
      required: true,
      rows: 6,
    },
    data: {
      type: 'textarea',
      name: 'data',
      label: 'Dati',
      placeholder: 'Inserisci i dati per calcolare CRC32...',
      required: true,
      rows: 6,
    },
  };

  return tool.fields.map(fieldName => fieldConfigs[fieldName] || {
    type: 'text',
    name: fieldName,
    label: fieldName,
    required: true,
  });
}

function generateFrontendComponent(tool) {
  const fields = generateFieldConfig(tool);
  const ctaLabel = tool.id.includes('hash') && !tool.id.includes('compare') ? 'Calcola hash' :
                   tool.id.includes('encrypt') ? 'Crittografa' :
                   tool.id.includes('decrypt') ? 'Decrittografa' :
                   tool.id.includes('verify') ? 'Verifica' :
                   tool.id.includes('encode') ? 'Codifica' :
                   tool.id.includes('decode') ? 'Decodifica' :
                   tool.id.includes('generator') ? 'Genera chiave' :
                   tool.id.includes('checker') ? 'Verifica password' :
                   tool.id.includes('calculator') ? 'Calcola CRC32' :
                   'Esegui';

  return `// 🔧 File: frontend/src/tools/${tool.id}/index.jsx
// 🔗 ${tool.name}

import React from 'react';

function ResultView({ result }) {
  if (!result) return null;

  return (
    <div className='space-y-4'>
      <div className='p-4 bg-white border border-slate-200 rounded-lg'>
        <pre className='text-sm whitespace-pre-wrap break-all font-mono'>
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
      {result.note && (
        <div className='p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm'>
          {result.note}
        </div>
      )}
    </div>
  );
}

const definition = {
  id: '${tool.id}',
  fields: ${JSON.stringify(fields, null, 2)},
  ResultView,
  ctaLabel: '${ctaLabel}',
};

export default definition;
`;
}

function main() {
  console.log('🔧 Generazione frontend components per Security Tools...\n');

  let created = 0;
  let skipped = 0;

  securityTools.forEach(tool => {
    const toolDir = path.join(FRONTEND_TOOLS_DIR, tool.id);
    const indexPath = path.join(toolDir, 'index.jsx');

    if (fs.existsSync(indexPath)) {
      console.log(`⏭️  ${tool.id}: Frontend già presente`);
      skipped++;
      return;
    }

    // Crea directory
    if (!fs.existsSync(toolDir)) {
      fs.mkdirSync(toolDir, { recursive: true });
    }

    const component = generateFrontendComponent(tool);
    fs.writeFileSync(indexPath, component);
    console.log(`✅ ${tool.id}: Frontend creato`);
    created++;
  });

  console.log('\n' + '='.repeat(50));
  console.log(`Creati: ${created}`);
  console.log(`Skip: ${skipped}`);
  console.log('='.repeat(50));
}

main();

