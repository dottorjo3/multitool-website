// 🔧 File: frontend/src/tools/image-blur/index.jsx
// 🔗 NeoPanze — Blur Immagine

import React from 'react';

function ResultView({ result }) {
  if (!result?.outputFile) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>Blur applicato (sigma: {result.sigma}).</p>
      <img
        src={`data:${result.outputFile.mimeType};base64,${result.outputFile.base64}`}
        alt='Preview blur'
        className='max-h-96 rounded-xl border border-slate-200 shadow-sm'
      />
    </div>
  );
}

const definition = {
  id: 'image-blur',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Immagine',
      helperText: 'Carica un’immagine da sfocare',
      accept: 'image/*',
      required: true,
    },
    {
      type: 'number',
      name: 'sigma',
      label: 'Intensità blur (sigma)',
      defaultValue: 5,
      min: 1,
      max: 100,
      step: 1,
    },
  ],
  ResultView,
  ctaLabel: 'Applica blur',
};

export default definition;


