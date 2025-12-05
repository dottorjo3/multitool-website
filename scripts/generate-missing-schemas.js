#!/usr/bin/env node
// 🔧 Script per generare schemas mancanti

const fs = require('fs');
const path = require('path');

const REGISTRY_PATH = path.join(__dirname, '..', 'backend', 'db', 'tools_registry.json');
const BACKEND_TOOLS_DIR = path.join(__dirname, '..', 'backend', 'tools');
const SCHEMAS_DIR = path.join(__dirname, '..', 'backend', 'tools', 'schemas');

function analyzeBackendFile(toolId, backendPath) {
  const content = fs.readFileSync(backendPath, 'utf8');
  const params = {};
  const required = [];

  // Pattern comuni per estrarre parametri
  const patterns = [
    /params\.(\w+)\?\./g,
    /params\.(\w+)\s*\|\|/g,
    /params\[['"](\w+)['"]\]/g,
  ];

  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const paramName = match[1];
      if (!params[paramName]) {
        params[paramName] = { type: 'string' };
        
        // Determina se è required
        if (content.includes(`params.${paramName}?.trim()`) || 
            content.includes(`!params.${paramName}`) ||
            content.includes(`params.${paramName} ||`)) {
          if (content.includes(`throw new Error`) && content.includes(paramName)) {
            required.push(paramName);
          }
        }
      }
    }
  });

  // Analizza tipi comuni
  if (content.includes('parseInt') || content.includes('parseFloat')) {
    Object.keys(params).forEach(key => {
      if (content.includes(`parseInt(params.${key}`) || content.includes(`parseFloat(params.${key}`)) {
        params[key].type = ['number', 'string'];
      }
    });
  }

  if (content.includes('textarea') || content.includes('rows')) {
    Object.keys(params).forEach(key => {
      if (content.includes(`params.${key}?.trim()`) && content.length > 100) {
        params[key].type = 'string';
      }
    });
  }

  return { params, required };
}

function generateSchema(tool, backendPath) {
  const { params, required } = analyzeBackendFile(tool.id, backendPath);

  // Schema base
  const schema = {
    $id: `${tool.id}.schema.json`,
    type: 'object',
    properties: {},
    required: [],
    additionalProperties: false,
  };

  // Se non abbiamo trovato parametri, crea uno schema generico
  if (Object.keys(params).length === 0) {
    if (tool.inputType === 'file') {
      schema.properties.file = {
        type: 'string',
        description: 'File to process',
      };
      schema.required = ['file'];
    } else if (tool.category === 'math') {
      schema.properties.input = {
        type: ['string', 'number'],
        description: 'Input value',
      };
      schema.required = ['input'];
    } else {
      schema.properties.text = {
        type: 'string',
        minLength: 1,
        description: 'Input text',
      };
      schema.required = ['text'];
    }
    return schema;
  }

  // Aggiungi proprietà trovate
  Object.entries(params).forEach(([key, value]) => {
    schema.properties[key] = {
      type: value.type || 'string',
      ...(key.includes('password') && { minLength: 4 }),
      ...(key.includes('number') && { type: ['number', 'string'] }),
      ...(key.includes('length') && { minimum: 1, maximum: 1000 }),
    };
  });

  schema.required = required.length > 0 ? required : Object.keys(params).slice(0, 1);

  return schema;
}

function main() {
  console.log('🔧 Generazione schemas mancanti...\n');

  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
  let created = 0;
  let skipped = 0;
  let errors = 0;

  registry.forEach(tool => {
    const schemaPath = path.join(SCHEMAS_DIR, `${tool.id}.schema.json`);
    const backendPath = path.join(BACKEND_TOOLS_DIR, `${tool.id}.js`);

    // Skip se già esiste
    if (fs.existsSync(schemaPath)) {
      skipped++;
      return;
    }

    // Skip se backend non esiste
    if (!fs.existsSync(backendPath)) {
      skipped++;
      return;
    }

    try {
      const schema = generateSchema(tool, backendPath);
      fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2) + '\n');
      console.log(`✅ ${tool.id}: Creato`);
      created++;
    } catch (error) {
      console.error(`❌ ${tool.id}: Errore - ${error.message}`);
      errors++;
    }
  });

  console.log('\n' + '='.repeat(50));
  console.log('📊 RIEPILOGO:');
  console.log('='.repeat(50));
  console.log(`Creati: ${created}`);
  console.log(`Skip: ${skipped}`);
  console.log(`Errori: ${errors}`);
  console.log('='.repeat(50));

  if (created > 0) {
    console.log('\n✅ Schemas generati con successo!');
    console.log('⚠️  Nota: Verifica e personalizza gli schemas se necessario.');
  }
}

main();


