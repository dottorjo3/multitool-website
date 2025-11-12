// 🔧 File: frontend/src/tools/image-resize/index.jsx
// 🔗 Farm Ready — UI preset social + campi avanzati per ridimensionamento

import React from 'react';

function downloadFile({ base64, mimeType, name }) {
  const link = document.createElement('a');
  link.href = `data:${mimeType};base64,${base64}`;
  link.download = name;
  link.click();
}

function ResultView({ result }) {
  if (!result?.outputFile) {
    return null;
  }

  return (
    <div className='bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-2'>
      <div>
        <h3 className='text-lg font-semibold text-emerald-800'>Ridimensionamento completato</h3>
        <p className='text-sm text-emerald-700'>
          Dimensioni finali: {result.width || 'auto'}×{result.height || 'auto'} — Fit: {result.fit}
        </p>
      </div>
      <button
        type='button'
        onClick={() => downloadFile(result.outputFile)}
        className='px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition'
      >
        Scarica immagine
      </button>
    </div>
  );
}

const definition = {
  id: 'image-resize',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica immagine',
      helperText: 'Formati supportati: JPG, PNG, WebP, AVIF, TIFF (max 200 MB).',
      accept: '.jpg,.jpeg,.png,.webp,.avif,.tiff,.tif',
      multiple: false,
      required: true,
    },
    {
      type: 'select',
      name: 'preset',
      label: 'Preset rapido (opzionale)',
      placeholder: 'Seleziona un preset social',
      allowEmpty: true,
      options: [
        { value: 'instagram-post', label: 'Instagram Post — 1080×1080' },
        { value: 'instagram-story', label: 'Instagram Story — 1080×1920' },
        { value: 'facebook-cover', label: 'Facebook Cover — 1640×624' },
        { value: 'linkedin-banner', label: 'LinkedIn Banner — 1584×396' },
        { value: 'youtube-thumbnail', label: 'YouTube Thumbnail — 1280×720' },
      ],
    },
    {
      type: 'number',
      name: 'width',
      label: 'Larghezza (px)',
      placeholder: 'Es. 1080',
      min: 1,
      max: 10000,
    },
    {
      type: 'number',
      name: 'height',
      label: 'Altezza (px)',
      placeholder: 'Es. 720',
      min: 1,
      max: 10000,
    },
    {
      type: 'select',
      name: 'fit',
      label: 'Modalità di adattamento',
      defaultValue: 'cover',
      options: [
        { value: 'cover', label: 'Cover (riempie e ritaglia)' },
        { value: 'contain', label: 'Contain (mantiene tutto, può avere bordi)' },
        { value: 'inside', label: 'Inside (riduce senza ingrandire)' },
        { value: 'outside', label: 'Outside (ingrandisce fino a coprire)' },
        { value: 'fill', label: 'Fill (deforma se necessario)' },
      ],
    },
    {
      type: 'checkbox',
      name: 'withoutEnlargement',
      label: 'Blocca upscale',
      helperText: 'Evita ingrandimenti oltre la risoluzione originale',
      defaultValue: 'true',
    },
    {
      type: 'select',
      name: 'format',
      label: 'Formato uscita (opzionale)',
      allowEmpty: true,
      options: [
        { value: 'jpeg', label: 'JPEG' },
        { value: 'png', label: 'PNG' },
        { value: 'webp', label: 'WebP' },
        { value: 'avif', label: 'AVIF' },
        { value: 'tiff', label: 'TIFF' },
      ],
    },
    {
      type: 'number',
      name: 'quality',
      label: 'Qualità (1-100)',
      placeholder: '85',
      min: 1,
      max: 100,
    },
  ],
  ResultView,
  ctaLabel: 'Ridimensiona immagine',
};

export default definition;


