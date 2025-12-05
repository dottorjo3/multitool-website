#!/usr/bin/env node
// 🔧 Script per generare frontend mancanti

const fs = require('fs');
const path = require('path');

const FRONTEND_TOOLS_DIR = path.join(__dirname, '..', 'frontend', 'src', 'tools');
const BACKEND_TOOLS_DIR = path.join(__dirname, '..', 'backend', 'tools');
const REGISTRY_PATH = path.join(__dirname, '..', 'backend', 'db', 'tools_registry.json');

// Tool mancanti identificati
const MISSING_FRONTENDS = {
  math: ['math-number-base64', 'math-percentage-difference', 'math-time-zone-converter'],
  audio: [
    'audio-bandpass', 'audio-batch-convert', 'audio-compressor', 'audio-echo', 'audio-equalizer',
    'audio-extract-silence', 'audio-fade', 'audio-highpass', 'audio-lowpass', 'audio-metadata',
    'audio-mix', 'audio-mono-to-stereo', 'audio-noise-reduction', 'audio-pitch', 'audio-reverb',
    'audio-reverse', 'audio-silence-remove', 'audio-spectrogram', 'audio-speed', 'audio-split',
    'audio-stereo-to-mono', 'audio-volume', 'audio-waveform'
  ],
  video: [
    'video-add-audio', 'video-brightness', 'video-concatenate', 'video-crop', 'video-extract-frames',
    'video-extract-thumbnails', 'video-fade', 'video-grayscale', 'video-loop', 'video-resize',
    'video-reverse', 'video-speed', 'video-stabilize', 'video-subtitles', 'video-watermark'
  ],
  image: [
    'image-aspect-ratio', 'image-auto-levels', 'image-blur-background', 'image-edge-detect',
    'image-emboss', 'image-exif-extract', 'image-extract-channel', 'image-extract-colors',
    'image-face-detection', 'image-gamma', 'image-histogram', 'image-hue-rotate',
    'image-noise-reduction', 'image-normalize', 'image-resize-smart', 'image-vignette',
    'image-white-balance'
  ],
  pdf: [
    'pdf-add-attachment', 'pdf-add-bookmarks', 'pdf-add-links', 'pdf-compress-advanced',
    'pdf-extract-attachments', 'pdf-extract-pages-range', 'pdf-page-thumbnails',
    'pdf-password-remove', 'pdf-remove-pages', 'pdf-rotate-specific', 'pdf-to-epub',
    'pdf-to-png'
  ]
};

// Template per tool file-based (audio, video, image, pdf)
function generateFileToolFrontend(toolId, category) {
  const toolName = toolId.split('-').slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
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
      accept: ${category === 'audio' ? "'.mp3,.wav,.flac,.aac,.ogg,.m4a'" : category === 'video' ? "'.mp4,.avi,.mov,.mkv,.webm'" : category === 'image' ? "'.jpg,.jpeg,.png,.gif,.webp'" : "'.pdf'"},
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

// Template per tool form-based (math)
function generateFormToolFrontend(toolId, backendFile) {
  const toolName = toolId.split('-').slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  // Leggi il backend per capire i parametri
  let fields = [];
  try {
    const content = fs.readFileSync(backendFile, 'utf8');
    // Estrai parametri base
    if (content.includes('params.number')) {
      fields.push({
        type: 'number',
        name: 'number',
        label: 'Numero',
        required: true,
      });
    }
    if (content.includes('params.text')) {
      fields.push({
        type: 'textarea',
        name: 'text',
        label: 'Testo',
        rows: 6,
        required: true,
      });
    }
  } catch (e) {
    // Fallback generico
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
  ctaLabel: 'Calcola',
};

export default definition;
`;
}

function main() {
  console.log('🔧 Generazione frontend mancanti...\n');

  let created = 0;
  let skipped = 0;

  Object.entries(MISSING_FRONTENDS).forEach(([category, tools]) => {
    tools.forEach(toolId => {
      const frontendDir = path.join(FRONTEND_TOOLS_DIR, toolId);
      const frontendFile = path.join(frontendDir, 'index.jsx');
      const backendFile = path.join(BACKEND_TOOLS_DIR, `${toolId}.js`);

      // Skip se già esiste
      if (fs.existsSync(frontendFile)) {
        console.log(`⏭️  ${toolId}: Già presente`);
        skipped++;
        return;
      }

      // Crea directory
      if (!fs.existsSync(frontendDir)) {
        fs.mkdirSync(frontendDir, { recursive: true });
      }

      // Genera frontend
      let content;
      if (['audio', 'video', 'image', 'pdf'].includes(category)) {
        content = generateFileToolFrontend(toolId, category);
      } else {
        content = generateFormToolFrontend(toolId, backendFile);
      }

      fs.writeFileSync(frontendFile, content);
      console.log(`✅ ${toolId}: Creato (${category})`);
      created++;
    });
  });

  console.log('\n' + '='.repeat(50));
  console.log('📊 RIEPILOGO:');
  console.log('='.repeat(50));
  console.log(`Creati: ${created}`);
  console.log(`Skip: ${skipped}`);
  console.log('='.repeat(50));

  if (created > 0) {
    console.log('\n✅ Frontend generati con successo!');
    console.log('⚠️  Nota: Verifica e personalizza i campi dei form se necessario.');
  }
}

main();


