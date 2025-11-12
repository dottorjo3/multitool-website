// 🔧 File: frontend/src/tools/image-shadow/index.jsx
// 🔗 NeoPanze — Drop Shadow

import React from 'react';

function ResultView({ result }) {
  if (!result?.outputFile) return null;

  return (
    <div className='space-y-3 text-sm text-slate-600'>
      <div className='flex flex-wrap gap-2'>
        <span className='inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600'>
          Offset X: {result.offsetX}px
        </span>
        <span className='inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600'>
          Offset Y: {result.offsetY}px
        </span>
        <span className='inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600'>
          Blur: {result.blur}px
        </span>
        <span className='inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600'>
          Spread: {result.spread}px
        </span>
      </div>
      <img
        src={`data:${result.outputFile.mimeType};base64,${result.outputFile.base64}`}
        alt='Anteprima ombra'
        className='max-h-96 rounded-xl border border-slate-200 shadow-sm'
      />
    </div>
  );
}

const definition = {
  id: 'image-shadow',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Immagine',
      accept: 'image/*',
      required: true,
    },
    {
      type: 'number',
      name: 'offsetX',
      label: 'Offset X',
      defaultValue: 20,
      step: 1,
    },
    {
      type: 'number',
      name: 'offsetY',
      label: 'Offset Y',
      defaultValue: 20,
      step: 1,
    },
    {
      type: 'number',
      name: 'blur',
      label: 'Blur',
      defaultValue: 30,
      min: 0,
      step: 1,
    },
    {
      type: 'number',
      name: 'spread',
      label: 'Spread',
      defaultValue: 40,
      min: 0,
      step: 1,
    },
    {
      type: 'text',
      name: 'color',
      label: 'Colore ombra',
      defaultValue: '#000000',
    },
    {
      type: 'number',
      name: 'opacity',
      label: 'Opacità',
      defaultValue: 0.35,
      min: 0,
      max: 1,
      step: 0.05,
    },
    {
      type: 'number',
      name: 'quality',
      label: 'Qualità (solo WebP/AVIF)',
      defaultValue: 85,
      min: 10,
      max: 100,
    },
  ],
  ResultView,
  ctaLabel: 'Aggiungi ombra',
};

export default definition;


