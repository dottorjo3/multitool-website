// 🔧 File: frontend/src/tools/image-grayscale/index.jsx
// 🔗 NeoPanze — Immagine in scala di grigi

import React from 'react';

function ResultView({ result }) {
  if (!result?.outputFile) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>Conversione completata.</p>
      <img
        src={`data:${result.outputFile.mimeType};base64,${result.outputFile.base64}`}
        alt='Preview grayscale'
        className='max-h-96 rounded-xl border border-slate-200 shadow-sm'
      />
    </div>
  );
}

const definition = {
  id: 'image-grayscale',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Immagine',
      helperText: 'Carica un’immagine (JPG, PNG, WebP...)',
      accept: 'image/*',
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Converti in scala di grigi',
};

export default definition;


