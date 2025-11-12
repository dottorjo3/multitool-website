// 🔧 File: frontend/src/tools/image-pixelate/index.jsx
// 🔗 NeoPanze — Effetto Pixel Art

import React from 'react';

function ResultView({ result }) {
  if (!result?.outputFile) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>Blocchi: {result.blockSize}px</p>
      <img
        src={`data:${result.outputFile.mimeType};base64,${result.outputFile.base64}`}
        alt='Anteprima pixelate'
        className='max-h-96 rounded-xl border border-slate-200 shadow-sm'
      />
    </div>
  );
}

const definition = {
  id: 'image-pixelate',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Immagine',
      helperText: 'Carica l’immagine da trasformare in pixel art',
      accept: 'image/*',
      required: true,
    },
    {
      type: 'number',
      name: 'blockSize',
      label: 'Dimensione blocchi (px)',
      defaultValue: 16,
      min: 2,
      max: 200,
    },
  ],
  ResultView,
  ctaLabel: 'Applica pixel art',
};

export default definition;


