// 🔧 File: frontend/src/tools/developer-color-converter/index.jsx
// 🔗 NeoPanze — Color Converter

import React from 'react';

function ColorSwatch({ hex }) {
  return (
    <div className='flex items-center gap-3'>
      <div className='w-10 h-10 rounded-lg border border-slate-200' style={{ backgroundColor: hex }} />
      <span className='font-mono text-sm'>{hex}</span>
    </div>
  );
}

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <p>Formato rilevato: <span className='font-semibold'>{result.detectedMode.toUpperCase()}</span></p>
      <ColorSwatch hex={result.hex} />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <div className='bg-slate-100 rounded-lg p-3'>
          <p className='font-semibold text-slate-600'>RGB</p>
          <p className='mt-1 font-mono text-slate-900'>rgb({result.rgb.r}, {result.rgb.g}, {result.rgb.b})</p>
        </div>
        <div className='bg-slate-100 rounded-lg p-3'>
          <p className='font-semibold text-slate-600'>HSL</p>
          <p className='mt-1 font-mono text-slate-900'>hsl({result.hsl.h}, {result.hsl.s}%, {result.hsl.l}%)</p>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'developer-color-converter',
  fields: [
    {
      type: 'text',
      name: 'input',
      label: 'Colore',
      placeholder: '#FF5733 oppure rgb(255, 87, 51) oppure hsl(11, 100%, 60%)',
      required: true,
    },
    {
      type: 'select',
      name: 'mode',
      label: 'Formato input',
      defaultValue: 'auto',
      options: [
        { value: 'auto', label: 'Auto' },
        { value: 'hex', label: 'HEX' },
        { value: 'rgb', label: 'RGB' },
        { value: 'hsl', label: 'HSL' },
      ],
    },
  ],
  ResultView,
  ctaLabel: 'Converti colore',
};

export default definition;


