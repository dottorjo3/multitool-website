// 🔧 File: frontend/src/tools/image-rounded-corners/index.jsx
// 🔗 NeoPanze — Angoli arrotondati

import React from 'react';

function ResultView({ result }) {
  if (!result?.outputFile) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>Raggio: {result.radius}px</p>
      <img
        src={`data:${result.outputFile.mimeType};base64,${result.outputFile.base64}`}
        alt='Anteprima rounded corners'
        className='max-h-96 border border-slate-200 shadow-sm rounded-xl'
      />
    </div>
  );
}

const definition = {
  id: 'image-rounded-corners',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Immagine',
      helperText: 'Carica un’immagine (preferibilmente con trasparenza per PNG/WebP)',
      accept: 'image/*',
      required: true,
    },
    {
      type: 'number',
      name: 'radius',
      label: 'Raggio (px)',
      defaultValue: 32,
      min: 1,
      max: 2000,
    },
  ],
  ResultView,
  ctaLabel: 'Applica angoli arrotondati',
};

export default definition;


