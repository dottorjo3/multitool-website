// 🔧 File: frontend/src/tools/image-sharpen/index.jsx
// 🔗 NeoPanze — Sharpen Immagine

import React from 'react';

function ResultView({ result }) {
  if (!result?.outputFile) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>
        Nitidezza applicata (sigma: {result.params.sigma}, flat: {result.params.flat}, jagged: {result.params.jagged})
      </p>
      <img
        src={`data:${result.outputFile.mimeType};base64,${result.outputFile.base64}`}
        alt='Anteprima sharpen'
        className='max-h-96 rounded-xl border border-slate-200 shadow-sm'
      />
    </div>
  );
}

const definition = {
  id: 'image-sharpen',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Immagine',
      helperText: 'Carica un’immagine da rendere più nitida',
      accept: 'image/*',
      required: true,
    },
    {
      type: 'number',
      name: 'sigma',
      label: 'Sigma',
      defaultValue: 1,
      min: 0,
      max: 10,
      step: 0.1,
    },
    {
      type: 'number',
      name: 'flat',
      label: 'Flat',
      defaultValue: 1,
      min: 0,
      max: 10,
      step: 0.1,
    },
    {
      type: 'number',
      name: 'jagged',
      label: 'Jagged',
      defaultValue: 2,
      min: 0,
      max: 10,
      step: 0.1,
    },
  ],
  ResultView,
  ctaLabel: 'Aumenta nitidezza',
};

export default definition;


