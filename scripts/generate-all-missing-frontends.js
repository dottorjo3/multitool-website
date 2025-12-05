#!/usr/bin/env node
// 🔧 Script per generare TUTTI i frontend mancanti

const fs = require('fs');
const path = require('path');

const FRONTEND_TOOLS_DIR = path.join(__dirname, '..', 'frontend', 'src', 'tools');
const BACKEND_TOOLS_DIR = path.join(__dirname, '..', 'backend', 'tools');
const REGISTRY_PATH = path.join(__dirname, '..', 'backend', 'db', 'tools_registry.json');
const FRONTEND_INDEX = path.join(__dirname, '..', 'frontend', 'src', 'tools', 'index.js');

// Template per tool file-based (audio, video, image, pdf)
function generateFileToolFrontend(toolId, category) {
  const toolName = toolId.split('-').slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  const acceptMap = {
    audio: '.mp3,.wav,.flac,.aac,.ogg,.m4a',
    video: '.mp4,.avi,.mov,.mkv,.webm',
    image: '.jpg,.jpeg,.png,.gif,.webp',
    pdf: '.pdf',
  };
  
  return `// 🔧 File: frontend/src/tools/${toolId}/index.jsx
// 🔗 ${toolName}

import React from 'react';

function ResultView({ result }) {
  if (!result?.outputFile) {
    return null;
  }

  const download = () => {
    const link = document.createElement('a');
    link.href = \`data:\${result.outputFile.mimeType};base64,\${result.outputFile.base64}\`;
    link.download = result.outputFile.name;
    link.click();
  };

  return (
    <div className='bg-sky-50 border border-sky-200 rounded-lg p-4 space-y-2'>
      <h3 className='text-lg font-semibold text-sky-800'>File processato con successo</h3>
      <button
        type='button'
        onClick={download}
        className='px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700'
      >
        Scarica file
      </button>
    </div>
  );
}

const definition = {
  id: '${toolId}',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica file',
      accept: '${acceptMap[category] || '.pdf'}',
      multiple: false,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Processa',
};

export default definition;
`;
}

// Template per tool form-based
function generateFormToolFrontend(toolId, category) {
  const toolName = toolId.split('-').slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  // Analizza backend per capire i parametri
  const backendPath = path.join(BACKEND_TOOLS_DIR, `${toolId}.js`);
  let fields = [];
  
  try {
    if (fs.existsSync(backendPath)) {
      const content = fs.readFileSync(backendPath, 'utf8');
      
      // Pattern per estrarre parametri
      if (content.includes('params.text')) {
        fields.push({
          type: 'textarea',
          name: 'text',
          label: 'Testo',
          rows: 6,
          required: true,
        });
      } else if (content.includes('params.input')) {
        fields.push({
          type: 'textarea',
          name: 'input',
          label: 'Input',
          rows: 6,
          required: true,
        });
      } else if (content.includes('params.number') || content.includes('parseInt') || content.includes('parseFloat')) {
        fields.push({
          type: 'number',
          name: 'number',
          label: 'Numero',
          required: true,
        });
      } else if (category === 'math') {
        fields.push({
          type: 'text',
          name: 'expression',
          label: 'Espressione',
          placeholder: 'Inserisci valore o espressione',
          required: true,
        });
      } else {
        fields.push({
          type: 'textarea',
          name: 'input',
          label: 'Input',
          rows: 6,
          required: true,
        });
      }
    }
  } catch (e) {
    // Fallback
    fields = [{
      type: 'textarea',
      name: 'input',
      label: 'Input',
      rows: 6,
      required: true,
    }];
  }

  return `// 🔧 File: frontend/src/tools/${toolId}/index.jsx
// 🔗 ${toolName}

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='bg-white border border-slate-200 rounded-lg p-4'>
      <pre className='text-sm text-slate-700 whitespace-pre-wrap break-words'>
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
}

const definition = {
  id: '${toolId}',
  fields: ${JSON.stringify(fields, null, 2)},
  ResultView,
  ctaLabel: 'Esegui',
};

export default definition;
`;
}

function main() {
  console.log('🔧 Generazione frontend mancanti...\n');

  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
  const frontendIndex = fs.readFileSync(FRONTEND_INDEX, 'utf8');

  let created = 0;
  let skipped = 0;
  const entriesToAdd = [];

  registry.forEach(tool => {
    const frontendDir = path.join(FRONTEND_TOOLS_DIR, tool.id);
    const frontendFile = path.join(frontendDir, 'index.jsx');
    const backendFile = path.join(BACKEND_TOOLS_DIR, `${tool.id}.js`);

    // Skip se già esiste
    if (fs.existsSync(frontendFile)) {
      skipped++;
      return;
    }

    // Skip se backend non esiste
    if (!fs.existsSync(backendFile)) {
      skipped++;
      return;
    }

    // Genera frontend
    let content;
    if (['audio', 'video', 'image', 'pdf'].includes(tool.category)) {
      content = generateFileToolFrontend(tool.id, tool.category);
    } else {
      content = generateFormToolFrontend(tool.id, tool.category);
    }

    // Crea directory
    if (!fs.existsSync(frontendDir)) {
      fs.mkdirSync(frontendDir, { recursive: true });
    }

    // Scrivi file
    fs.writeFileSync(frontendFile, content);

    // Aggiungi al registry se non presente
    if (!frontendIndex.includes(`'${tool.id}':`)) {
      entriesToAdd.push(`  '${tool.id}': () => import('./${tool.id}/index.jsx'),`);
    }

    console.log(`✅ ${tool.id}: Creato (${tool.category})`);
    created++;
  });

  // Aggiorna frontend index
  if (entriesToAdd.length > 0) {
    let indexContent = fs.readFileSync(FRONTEND_INDEX, 'utf8');
    const closingBraceIndex = indexContent.lastIndexOf('};');
    
    if (closingBraceIndex !== -1) {
      const newEntries = entriesToAdd.join('\n') + '\n';
      indexContent = 
        indexContent.slice(0, closingBraceIndex) +
        (indexContent[closingBraceIndex - 1] !== '\n' ? '\n' : '') +
        newEntries +
        indexContent.slice(closingBraceIndex);
      
      fs.writeFileSync(FRONTEND_INDEX, indexContent);
      console.log(`\n✅ ${entriesToAdd.length} tool aggiunti al frontend index`);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 RIEPILOGO:');
  console.log('='.repeat(50));
  console.log(`Creati: ${created}`);
  console.log(`Skip: ${skipped}`);
  console.log(`Index aggiornati: ${entriesToAdd.length}`);
  console.log('='.repeat(50));

  if (created > 0) {
    console.log('\n✅ Frontend generati con successo!');
  }
}

main();


