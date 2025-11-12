// 🔧 File: frontend/src/tools/image-add-border/index.jsx
// 🔗 NeoPanze — Bordi immagine

import React from 'react';

function ResultView({ result }) {
  if (!result?.outputFile) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>
        Bordo: {result.border}px • Colore: {result.color}
      </p>
      <img
        src={`data:${result.outputFile.mimeType};base64,${result.outputFile.base64}`}
        alt='Anteprima con bordo'
        className='max-h-96 rounded-xl border border-slate-200 shadow-sm'
      />
    </div>
  );
}

const definition = {
  id: 'image-add-border',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Immagine',
      helperText: 'Carica l’immagine a cui aggiungere il bordo',
      accept: 'image/*',
      required: true,
    },
    {
      type: 'number',
      name: 'border',
      label: 'Spessore bordo (px)',
      defaultValue: 20,
      min: 1,
      max: 500,
    },
    {
      type: 'text',
      name: 'color',
      label: 'Colore (HEX)',
      defaultValue: '#000000',
    },
  ],
  ResultView,
  ctaLabel: 'Aggiungi bordo',
};

export default definition;


