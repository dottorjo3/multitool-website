// 🔧 File: frontend/src/tools/image-duotone/index.jsx
// 🔗 NeoPanze — Duotone Effect

import React from 'react';

function ResultView({ result }) {
  if (!result?.outputFile) return null;

  return (
    <div className='space-y-3 text-sm text-slate-600'>
      <div className='flex flex-wrap gap-2'>
        <span className='inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600'>
          Ombra: {result.shadowColor}
        </span>
        <span className='inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600'>
          Highlight: {result.highlightColor}
        </span>
      </div>
      <img
        src={`data:${result.outputFile.mimeType};base64,${result.outputFile.base64}`}
        alt='Anteprima duotone'
        className='max-h-96 rounded-xl border border-slate-200 shadow-sm'
      />
    </div>
  );
}

const definition = {
  id: 'image-duotone',
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
      name: 'shadowColor',
      label: 'Colore ombra',
      defaultValue: '#1F2937',
    },
    {
      type: 'text',
      name: 'highlightColor',
      label: 'Colore highlight',
      defaultValue: '#F59E0B',
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
  ctaLabel: 'Applica duotone',
};

export default definition;


