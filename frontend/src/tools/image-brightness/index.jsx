// 🔧 File: frontend/src/tools/image-brightness/index.jsx
// 🔗 NeoPanze — Brightness Adjustment

import React from 'react';

function ResultView({ result }) {
  if (!result?.outputFile) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>Luminosità: {result.brightness}</p>
      <img
        src={`data:${result.outputFile.mimeType};base64,${result.outputFile.base64}`}
        alt='Anteprima luminosità'
        className='max-h-96 rounded-xl border border-slate-200 shadow-sm'
      />
    </div>
  );
}

const definition = {
  id: 'image-brightness',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Immagine',
      helperText: 'Carica un’immagine da modificare',
      accept: 'image/*',
      required: true,
    },
    {
      type: 'number',
      name: 'brightness',
      label: 'Luminosità',
      defaultValue: 1,
      min: 0.1,
      max: 3,
      step: 0.1,
    },
    {
      type: 'number',
      name: 'quality',
      label: 'Qualità (se applicabile)',
      defaultValue: 85,
      min: 10,
      max: 100,
    },
  ],
  ResultView,
  ctaLabel: 'Regola luminosità',
};

export default definition;


