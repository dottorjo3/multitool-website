// 🔧 File: frontend/src/tools/pdf-crop/index.jsx
// 🔗 NeoPanze — Ritaglia pagine PDF

import React from 'react';

function downloadBase64({ base64, name, mimeType }) {
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
    <div className='bg-green-50 border border-green-200 rounded-lg p-4 space-y-3'>
      <div>
        <h3 className='text-lg font-semibold text-green-800'>PDF ritagliato con successo!</h3>
        <p className='text-sm text-green-700'>
          Pagine ritagliate: {result.pagesCropped || 0} • 
          Dimensione: {result.outputSizeBytes ? `${(result.outputSizeBytes / 1024).toFixed(2)} KB` : 'N/A'}
        </p>
      </div>
      <button
        type='button'
        onClick={() => downloadBase64(result.outputFile)}
        className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition'
      >
        Scarica PDF ritagliato
      </button>
    </div>
  );
}

const definition = {
  id: 'pdf-crop',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica PDF da ritagliare',
      helperText: 'Seleziona un file PDF (max 200 MB).',
      accept: '.pdf',
      multiple: false,
      required: true,
    },
    {
      type: 'number',
      name: 'x',
      label: 'Posizione X (pixel)',
      defaultValue: 0,
      min: 0,
      helperText: 'Posizione orizzontale da cui iniziare il ritaglio',
    },
    {
      type: 'number',
      name: 'y',
      label: 'Posizione Y (pixel)',
      defaultValue: 0,
      min: 0,
      helperText: 'Posizione verticale da cui iniziare il ritaglio',
    },
    {
      type: 'number',
      name: 'width',
      label: 'Larghezza (pixel)',
      required: true,
      min: 1,
      helperText: 'Larghezza dell\'area da ritagliare',
    },
    {
      type: 'number',
      name: 'height',
      label: 'Altezza (pixel)',
      required: true,
      min: 1,
      helperText: 'Altezza dell\'area da ritagliare',
    },
    {
      type: 'text',
      name: 'pages',
      label: 'Pagine da ritagliare',
      defaultValue: 'all',
      placeholder: 'all oppure 1,2,3',
      helperText: 'Specifica "all" per tutte le pagine, o numeri separati da virgola (es. 1,3,5)',
    },
  ],
  ResultView,
  ctaLabel: 'Ritaglia PDF',
};

export default definition;
