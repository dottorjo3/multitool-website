// 🔧 File: frontend/src/tools/image-invert/index.jsx
// 🔗 NeoPanze — Inverti colori

import React from 'react';

function ResultView({ result }) {
  if (!result?.outputFile) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>Colori invertiti.</p>
      <img
        src={`data:${result.outputFile.mimeType};base64,${result.outputFile.base64}`}
        alt='Anteprima invertita'
        className='max-h-96 rounded-xl border border-slate-200 shadow-sm'
      />
    </div>
  );
}

const definition = {
  id: 'image-invert',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Immagine',
      helperText: 'Carica un’immagine da invertire',
      accept: 'image/*',
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Inverti colori',
};

export default definition;


