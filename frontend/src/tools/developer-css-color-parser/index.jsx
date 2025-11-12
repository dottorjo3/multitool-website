// 🔧 File: frontend/src/tools/developer-css-color-parser/index.jsx
// 🔗 NeoPanze — CSS Color Parser

import React from 'react';

function ResultView({ result }) {
  if (!result) return null;

  const { normalized, palette } = result;

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='flex flex-wrap gap-3'>
        {Object.entries(normalized).map(([format, value]) => (
          <span key={format} className='bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold'>
            {format.toUpperCase()}: {value}
          </span>
        ))}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <div className='rounded-xl border border-slate-200 overflow-hidden'>
          <div className='h-20' style={{ backgroundColor: normalized.hex }} />
          <div className='px-4 py-2 text-xs text-slate-500'>Colore originale</div>
        </div>
        <div className='rounded-xl border border-slate-200 overflow-hidden'>
          <div className='h-20' style={{ backgroundColor: palette.lighten.hex }} />
          <div className='px-4 py-2 text-xs text-slate-500'>Lighten 10% ({palette.lighten.hex})</div>
        </div>
        <div className='rounded-xl border border-slate-200 overflow-hidden'>
          <div className='h-20' style={{ backgroundColor: palette.darken.hex }} />
          <div className='px-4 py-2 text-xs text-slate-500'>Darken 10% ({palette.darken.hex})</div>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'developer-css-color-parser',
  fields: [
    {
      type: 'text',
      name: 'color',
      label: 'Colore',
      placeholder: '#FF6B6B oppure rgb(255,0,0) o hsl(0,100%,50%)',
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Analizza colore',
};

export default definition;


