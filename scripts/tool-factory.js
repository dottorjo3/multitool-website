#!/usr/bin/env node
// 🔧 Script: scripts/tool-factory.js
// 🔗 Farm Ready — Generatore CLI per nuovi microtool Bibble 2.0
//
// Questo script crea lo scheletro completo di un nuovo tool:
// - backend/tools/<id>.js
// - backend/tools/schemas/<id>.schema.json
// - frontend/src/tools/<id>/index.jsx
// - backend/db/tools_registry.json
// - frontend/src/tools/index.js (aggiunge import dinamico)
//
// Usa Node 18+/20+ (readline/promises). Nessuna dipendenza extra.

const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const { stdin, stdout } = require('process');
const readline = require('readline/promises');

const ROOT_DIR = path.resolve(__dirname, '..');
const BACKEND_DIR = path.join(ROOT_DIR, 'backend');
const FRONTEND_DIR = path.join(ROOT_DIR, 'frontend');
const REGISTRY_PATH = path.join(BACKEND_DIR, 'db', 'tools_registry.json');
const TOOLS_DIR = path.join(BACKEND_DIR, 'tools');
const SCHEMAS_DIR = path.join(TOOLS_DIR, 'schemas');
const FRONTEND_TOOLS_DIR = path.join(FRONTEND_DIR, 'src', 'tools');
const FRONTEND_REGISTRY_PATH = path.join(FRONTEND_TOOLS_DIR, 'index.js');
const DOCS_TOOLS_DIR = path.join(ROOT_DIR, 'docs', 'tools');

const SUPPORTED_BLUEPRINTS = {
  'text-basic': {
    label: 'Elaborazione testo (textarea -> output testo)',
    fieldName: 'input',
    docSummary: 'Prende un testo in input e restituisce un risultato testuale.',
    frontendField: (toolName) => `{
    type: 'textarea',
    name: 'input',
    label: '${toolName} – input',
    placeholder: 'Inserisci il testo da elaborare',
    rows: 8,
    required: true,
  }`,
    schema: (toolId) => ({
      $id: `${toolId}.schema.json`,
      type: 'object',
      properties: {
        input: {
          type: 'string',
          minLength: 1,
          errorMessage: 'Inserisci del testo da elaborare',
        },
      },
      required: ['input'],
      additionalProperties: false,
    }),
    backend: () => `  const input = params.input?.trim();

    if (!input) {
      throw new Error('Input vuoto: fornisci del testo da elaborare');
    }

    // TODO: sostituisci questa logica con l'elaborazione reale
    const output = input;

    return {
      output,
      length: output.length,
    };`,
    defaultInputType: 'text',
    defaultOutputType: 'text',
  },
  'file-single': {
    label: 'Elaborazione file singolo (es. PDF, immagine)',
    docSummary: 'Accetta un file alla volta e produce un output (file, testo o metadati).',
    frontendField: (toolName) => `{
    type: 'file',
    name: 'file',
    label: '${toolName} – carica file',
    accept: '*/*',
    required: true,
    helperText: 'Carica un file da elaborare (modifica accept a seconda del formato)',
  }`,
    schema: (toolId) => ({
      $id: `${toolId}.schema.json`,
      type: 'object',
      properties: {},
      required: [],
      additionalProperties: false,
    }),
    backend: () => `  const file = filesMeta?.[0];

    if (!file) {
      throw new Error('Nessun file ricevuto. Aggiungi un campo tipo file nel frontend.');
    }

    // TODO: implementa la logica reale usando file.filePath
    return {
      message: \`File ricevuto: \${file.originalName}\`,
      sizeBytes: file.size,
    };`,
    defaultInputType: 'file',
    defaultOutputType: 'object',
  },
  'file-multi': {
    label: 'Elaborazione file multipli con output ZIP',
    docSummary: 'Accetta più file in ingresso e produce un archivio o una collezione elaborata.',
    frontendField: (toolName) => `{
    type: 'file',
    name: 'files',
    label: '${toolName} – carica file',
    accept: '*/*',
    multiple: true,
    required: true,
    helperText: 'Seleziona uno o più file da elaborare',
  }`,
    schema: (toolId) => ({
      $id: `${toolId}.schema.json`,
      type: 'object',
      properties: {
        note: {
          type: 'string',
          default: '',
        },
      },
      required: [],
      additionalProperties: false,
    }),
    backend: () => `  if (!filesMeta?.length) {
      throw new Error('Seleziona almeno un file da elaborare');
    }

    // TODO: implementa la logica batch (creazione file temporanei, zip, ecc.)
    const items = filesMeta.map((file) => ({
      originalName: file.originalName,
      sizeBytes: file.size,
    }));

    return {
      processedCount: items.length,
      items,
    };`,
    defaultInputType: 'file',
    defaultOutputType: 'archive',
  },
  'ai-text': {
    label: 'Blueprint AI pronto (prompt → risposta testo)',
    docSummary: 'Invia un prompt al Farm Connector per elaborazione AI (writer/summarizer).',
    frontendField: (toolName) => `{
    type: 'textarea',
    name: 'prompt',
    label: '${toolName} – prompt',
    placeholder: 'Scrivi il prompt da inviare al modello',
    rows: 8,
    required: true,
  },
  {
    type: 'number',
    name: 'temperature',
    label: 'Creatività (temperature)',
    defaultValue: 0.7,
    min: 0,
    max: 1,
    step: 0.1,
    helperText: '0 = deterministico, 1 = molto creativo',
  }`,
    schema: (toolId) => ({
      $id: `${toolId}.schema.json`,
      type: 'object',
      properties: {
        prompt: {
          type: 'string',
          minLength: 3,
          errorMessage: 'Inserisci un prompt (min 3 caratteri)',
        },
        temperature: {
          type: ['number', 'string'],
          minimum: 0,
          maximum: 1,
          default: 0.7,
        },
      },
      required: ['prompt'],
      additionalProperties: false,
    }),
    backend: () => `  const prompt = params.prompt?.trim();
    const temperature = Number(params.temperature ?? 0.7);

    if (!prompt) {
      throw new Error('Prompt mancante: inserisci il testo da inviare al modello AI');
    }

    if (helpers?.dispatchJob) {
      const response = await helpers.dispatchJob('ai-text', {
        requestId,
        userId,
        payload: {
          prompt,
          temperature,
          attachments: filesMeta || [],
        },
      });
      return response?.result || response;
    }

    // TODO: sostituisci con integrazione reale (mock locale / farm)
    return {
      prompt,
      temperature,
      output: '💡 TODO: collega questo tool a helpers.dispatchJob per una risposta reale.',
    };`,
    defaultInputType: 'text',
    defaultOutputType: 'text',
  },
};

function toKebabCase(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function ask(rl, question, { defaultValue, validate, transform } = {}) {
  const suffix = defaultValue ? ` (default: ${defaultValue})` : '';
  const answer = (await rl.question(`${question}${suffix}: `)).trim();
  const finalValue = answer === '' && defaultValue !== undefined ? defaultValue : answer;

  if (validate) {
    const validationResult = validate(finalValue);
    if (validationResult !== true) {
      stdout.write(`❌ ${validationResult}\n`);
      return ask(rl, question, { defaultValue, validate, transform });
    }
  }

  return transform ? transform(finalValue) : finalValue;
}

async function loadRegistry() {
  const raw = await fsp.readFile(REGISTRY_PATH, 'utf8');
  return JSON.parse(raw);
}

function normalizeRegistryEntries(entries) {
  const map = new Map();
  entries.forEach((entry) => {
    if (!map.has(entry.id)) {
      map.set(entry.id, entry);
    }
  });

  return [...map.values()].sort((a, b) => {
    if (a.category === b.category) {
      return a.name.localeCompare(b.name);
    }
    return a.category.localeCompare(b.category);
  });
}

async function saveRegistry(registry) {
  const normalized = normalizeRegistryEntries(registry);
  const content = `${JSON.stringify(normalized, null, 2)}\n`;
  await fsp.writeFile(REGISTRY_PATH, content, 'utf8');
}

async function updateFrontendRegistry(toolId) {
  const raw = await fsp.readFile(FRONTEND_REGISTRY_PATH, 'utf8');
  const startMarker = 'const registry = {\n';
  const startIndex = raw.indexOf(startMarker);
  const endIndex = raw.indexOf('\n};', startIndex);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error('Impossibile aggiornare frontend/src/tools/index.js (sezione registry non trovata)');
  }

  const body = raw.slice(startIndex + startMarker.length, endIndex);
  const entryRegex = /  '([^']+)': \(\) => import\('\.\/([^']+)\/index\.jsx'\),\n?/g;
  const entries = new Map();

  let match;
  while ((match = entryRegex.exec(body)) !== null) {
    entries.set(match[1], match[2]);
  }

  if (entries.has(toolId)) {
    stdout.write('ℹ️  Il tool è già registrato in frontend/src/tools/index.js — salto.\n');
    return;
  }

  entries.set(toolId, toolId);
  const sortedKeys = [...entries.keys()].sort((a, b) => a.localeCompare(b));

  const rebuiltBody = sortedKeys
    .map((key) => `  '${key}': () => import('./${entries.get(key)}/index.jsx'),`)
    .join('\n')
    .concat('\n');

  const updated = `${raw.slice(0, startIndex + startMarker.length)}${rebuiltBody}${raw.slice(endIndex)}`;
  await fsp.writeFile(FRONTEND_REGISTRY_PATH, updated, 'utf8');
}

async function writeBackendTool(toolId, toolName, blueprint) {
  const targetPath = path.join(TOOLS_DIR, `${toolId}.js`);
  if (fs.existsSync(targetPath)) {
    throw new Error(`Esiste già un file backend/tools/${toolId}.js`);
  }

  const template = `// 🔧 File: backend/tools/${toolId}.js
// 🔗 Generato automaticamente dalla Tool Factory CLI (${new Date().toISOString()})

module.exports = {
  async run({ params, filesMeta, requestId, userId, helpers }) {
${blueprint.backend()}
  },
};
`;

  await fsp.writeFile(targetPath, template, 'utf8');
}

async function writeSchema(toolId, blueprint) {
  const targetPath = path.join(SCHEMAS_DIR, `${toolId}.schema.json`);
  if (fs.existsSync(targetPath)) {
    throw new Error(`Esiste già uno schema per ${toolId}`);
  }

  const content = `${JSON.stringify(blueprint.schema(toolId), null, 2)}\n`;
  await fsp.writeFile(targetPath, content, 'utf8');
}

async function writeFrontendDefinition(toolId, toolName, blueprint) {
  const toolDir = path.join(FRONTEND_TOOLS_DIR, toolId);
  const filePath = path.join(toolDir, 'index.jsx');

  if (fs.existsSync(filePath)) {
    throw new Error(`Esiste già frontend/src/tools/${toolId}/index.jsx`);
  }

  await fsp.mkdir(toolDir, { recursive: true });

  const fieldBlock = blueprint.frontendField(toolName);

  const template = `// 🔧 File: frontend/src/tools/${toolId}/index.jsx
// 🔗 Generato automaticamente dalla Tool Factory CLI (${new Date().toISOString()})

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>Output del tool</p>
      <pre className='bg-slate-900 text-slate-100 rounded-lg p-4 text-sm overflow-auto max-h-80'>
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
}

const definition = {
  id: '${toolId}',
  fields: [
  ${fieldBlock}
  ],
  ResultView,
  ctaLabel: '${toolName}',
};

export default definition;
`;

  await fsp.writeFile(filePath, template, 'utf8');
}

function describeSchemaProperty(key, schemaFragment) {
  if (!schemaFragment || typeof schemaFragment !== 'object') {
    return `- \`${key}\` — Definizione non specificata`;
  }

  const type = Array.isArray(schemaFragment.type)
    ? schemaFragment.type.join('/')
    : schemaFragment.type || 'any';

  const chunks = [];
  if (schemaFragment.description) {
    chunks.push(schemaFragment.description);
  }
  chunks.push(`Tipo: ${type}`);

  if (schemaFragment.enum) {
    chunks.push(`Valori: ${schemaFragment.enum.join(', ')}`);
  }

  if (schemaFragment.default !== undefined) {
    chunks.push(`Default: ${schemaFragment.default}`);
  }

  if (schemaFragment.minLength !== undefined) {
    chunks.push(`minLength: ${schemaFragment.minLength}`);
  }

  if (schemaFragment.maxLength !== undefined) {
    chunks.push(`maxLength: ${schemaFragment.maxLength}`);
  }

  return `- \`${key}\` — ${chunks.join(' • ')}`;
}

async function writeDocs(toolId, toolName, blueprint, { category, isFree, description }) {
  await fsp.mkdir(DOCS_TOOLS_DIR, { recursive: true });
  const docPath = path.join(DOCS_TOOLS_DIR, `${toolId}.md`);
  if (fs.existsSync(docPath)) {
    stdout.write(`ℹ️  Documento docs/tools/${toolId}.md già esistente — verrà aggiornato.\n`);
  }

  const schema = blueprint.schema(toolId);
  const properties = (schema && schema.properties) || {};
  const propertyLines = Object.keys(properties).length
    ? Object.entries(properties).map(([key, value]) => describeSchemaProperty(key, value))
    : ['- Nessun parametro definito nello schema'];

  const docContent = `# ${toolName}

_Generated automaticamente il ${new Date().toISOString().slice(0, 10)}_

- **Tool ID:** \`${toolId}\`
- **Categoria:** \`${category}\`
- **Free:** ${isFree ? 'Sì' : 'No'}
- **Descrizione breve:** ${description}
- **Input:** \`${blueprint.defaultInputType || 'n/a'}\`
- **Output:** \`${blueprint.defaultOutputType || 'n/a'}\`

## Parametri principali
${propertyLines.join('\n')}

## Schema
\`\`\`json
${JSON.stringify(schema, null, 2)}
\`\`\`
`;

  await fsp.writeFile(docPath, docContent, 'utf8');
}

async function ensureDirectories() {
  const required = [TOOLS_DIR, SCHEMAS_DIR, FRONTEND_TOOLS_DIR, DOCS_TOOLS_DIR];
  await Promise.all(required.map((dir) => fsp.mkdir(dir, { recursive: true })));
}

async function main() {
  await ensureDirectories();

  const rl = readline.createInterface({ input: stdin, output: stdout });
  stdout.write('✨ Bibble Tool Factory CLI — creiamo un nuovo microtool\n\n');

  const rawId = await ask(rl, 'ID tool (kebab-case, es. text-cleaner)', {
    validate: (value) => {
      if (!value) return 'L\'ID è obbligatorio';
      if (!/^[a-z0-9-]+$/.test(value)) return 'Usa solo lettere minuscole, numeri e trattini';
      return true;
    },
  });
  const toolId = toKebabCase(rawId);

  const registry = await loadRegistry();
  if (registry.some((tool) => tool.id === toolId)) {
    rl.close();
    throw new Error(`Il tool ${toolId} esiste già nel registry`);
  }

  const toolName = await ask(rl, 'Nome visualizzato (es. Text Cleaner)', {
    validate: (value) => (value ? true : 'Il nome visualizzato è obbligatorio'),
  });

  stdout.write('\nSeleziona il blueprint di partenza:\n');
  const blueprintKeys = Object.keys(SUPPORTED_BLUEPRINTS);
  blueprintKeys.forEach((key, index) => {
    stdout.write(`  [${index + 1}] ${SUPPORTED_BLUEPRINTS[key].label} (${key})\n`);
  });

  const blueprintIndex = await ask(rl, 'Blueprint', {
    defaultValue: '1',
    validate: (value) => {
      const num = Number(value);
      if (!Number.isInteger(num) || num < 1 || num > blueprintKeys.length) {
        return `Inserisci un numero tra 1 e ${blueprintKeys.length}`;
      }
      return true;
    },
    transform: (value) => blueprintKeys[Number(value) - 1],
  });
  const blueprint = SUPPORTED_BLUEPRINTS[blueprintIndex];

  const category = await ask(rl, 'Categoria (es. text, pdf, image, developer, ai, audio, video, other)', {
    defaultValue: 'other',
  });

  const description = await ask(rl, 'Descrizione breve (max 120 caratteri)', {
    validate: (value) => (value ? true : 'La descrizione è obbligatoria'),
  });

  const freeAnswer = await ask(rl, 'È gratuito? (y/n)', {
    defaultValue: 'y',
    transform: (value) => value.toLowerCase(),
    validate: (value) => (['y', 'n'].includes(value) ? true : 'Rispondi con y oppure n'),
  });
  const isFree = freeAnswer === 'y';

  const inputType = await ask(rl, 'Input type per registry', {
    defaultValue: blueprint.defaultInputType,
  });

  const outputType = await ask(rl, 'Output type per registry', {
    defaultValue: blueprint.defaultOutputType,
  });

  rl.close();

  stdout.write('\n📦 Generazione file...\n');

  await writeBackendTool(toolId, toolName, blueprint);
  await writeSchema(toolId, blueprint);
  await writeFrontendDefinition(toolId, toolName, blueprint);
  await updateFrontendRegistry(toolId);
  await writeDocs(toolId, toolName, blueprint, { category, isFree, description });

  const newEntry = {
    id: toolId,
    name: toolName,
    category,
    free: isFree,
    description,
    languages: ['en', 'it'],
    inputType,
    outputType,
  };

  registry.push(newEntry);
  await saveRegistry(registry);

  stdout.write('✅ Tool creato!\n\n');
  stdout.write(`- backend/tools/${toolId}.js\n`);
  stdout.write(`- backend/tools/schemas/${toolId}.schema.json\n`);
  stdout.write(`- frontend/src/tools/${toolId}/index.jsx\n`);
  stdout.write('- Registrato in backend/db/tools_registry.json\n');
  stdout.write('- Aggiornato frontend/src/tools/index.js\n\n');
  stdout.write(`- Creato documento docs/tools/${toolId}.md\n\n`);
  stdout.write('✏️  Ricorda di:\n');
  stdout.write('  • Implementare la logica reale nel runner backend\n');
  stdout.write('  • Personalizzare schema e UI (placeholder generati)\n');
  stdout.write('  • Aggiungere traduzioni in locales/ se necessario\n');
  stdout.write('  • Aggiornare eventuali pagine categoria\n');
}

main().catch((error) => {
  stdout.write(`\n❌ Errore: ${error.message}\n`);
  process.exitCode = 1;
});

