// 🔧 File: frontend/src/tools/image-sepia/index.jsx
// 🔗 NeoPanze — Effetto seppia

import React from 'react';

function ResultView({ result }) {
  if (!result?.outputFile) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>Intensità seppia: {result.intensity}</p>
      <img
        src={`data:${result.outputFile.mimeType};base64,${result.outputFile.base64}`}
        alt='Preview sepia'
        className='max-h-96 rounded-xl border border-slate-200 shadow-sm'
      />
    </div>
  );
}

const definition = {
  id: 'image-sepia',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Immagine',
      helperText: 'Carica la foto su cui applicare l’effetto seppia',
      accept: 'image/*',
      required: true,
    },
    {
      type: 'number',
      name: 'intensity',
      label: 'Intensità',
      defaultValue: 0.8,
      min: 0,
      max: 1,
      step: 0.1,
    },
  ],
  ResultView,
  ctaLabel: 'Applica effetto seppia',
};

export default definition;


