// 🔧 File: frontend/src/tools/image-overlay-solid/index.jsx
// 🔗 NeoPanze — Solid Overlay

import React from 'react';

function ResultView({ result }) {
  if (!result?.outputFile) return null;

  return (
    <div className='space-y-3 text-sm text-slate-600'>
      <div className='flex flex-wrap gap-2'>
        <span className='inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600'>
          Colore: {result.color}
        </span>
        <span className='inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600'>
          Opacità: {result.opacity}
        </span>
      </div>
      <img
        src={`data:${result.outputFile.mimeType};base64,${result.outputFile.base64}`}
        alt='Anteprima overlay'
        className='max-h-96 rounded-xl border border-slate-200 shadow-sm'
      />
    </div>
  );
}

const definition = {
  id: 'image-overlay-solid',
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
      label: 'Colore overlay',
      defaultValue: '#1F2937',
    },
    {
      type: 'number',
      name: 'opacity',
      label: 'Opacità',
      defaultValue: 0.5,
      min: 0,
      max: 1,
      step: 0.05,
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
  ctaLabel: 'Applica overlay',
};

export default definition;


