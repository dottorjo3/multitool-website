// 🔧 File: frontend/src/tools/image-tint/index.jsx
// 🔗 NeoPanze — Tinta colore

import React from 'react';

function ResultView({ result }) {
  if (!result?.outputFile) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>Colore applicato: {result.color}</p>
      <img
        src={`data:${result.outputFile.mimeType};base64,${result.outputFile.base64}`}
        alt='Anteprima colorata'
        className='max-h-96 rounded-xl border border-slate-200 shadow-sm'
      />
    </div>
  );
}

const definition = {
  id: 'image-tint',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Immagine',
      accept: 'image/*',
      required: true,
    },
    {
      type: 'text',
      name: 'color',
      label: 'Colore (HEX)',
      placeholder: '#FF6B6B',
      defaultValue: '#FF6B6B',
    },
    {
      type: 'number',
      name: 'quality',
      label: 'Qualità (solo JPEG/WebP/AVIF)',
      defaultValue: 85,
      min: 10,
      max: 100,
    },
  ],
  ResultView,
  ctaLabel: 'Applica tinta',
};

export default definition;


