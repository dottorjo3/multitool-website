// 🔧 File: frontend/src/tools/image-crop/index.jsx
// 🔗 NeoPanze — Crop immagine

import React from 'react';

function ResultView({ result }) {
  if (!result?.outputFile) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>
        Area: {result.area.width}×{result.area.height} @ ({result.area.left}, {result.area.top})
      </p>
      <img
        src={`data:${result.outputFile.mimeType};base64,${result.outputFile.base64}`}
        alt='Anteprima crop'
        className='max-h-96 rounded-xl border border-slate-200 shadow-sm'
      />
    </div>
  );
}

const definition = {
  id: 'image-crop',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Immagine',
      helperText: 'Carica l’immagine da ritagliare',
      accept: 'image/*',
      required: true,
    },
    {
      type: 'number',
      name: 'left',
      label: 'Posizione X (px)',
      defaultValue: 0,
      min: 0,
    },
    {
      type: 'number',
      name: 'top',
      label: 'Posizione Y (px)',
      defaultValue: 0,
      min: 0,
    },
    {
      type: 'number',
      name: 'width',
      label: 'Larghezza crop',
      required: true,
      min: 1,
    },
    {
      type: 'number',
      name: 'height',
      label: 'Altezza crop',
      required: true,
      min: 1,
    },
  ],
  ResultView,
  ctaLabel: 'Ritaglia immagine',
};

export default definition;


