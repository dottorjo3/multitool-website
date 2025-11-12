// 🔧 File: frontend/src/tools/image-color-palette/index.jsx
// 🔗 NeoPanze — Estrai palette colori dominante da immagini

import React from 'react';

function ResultView({ result }) {
  if (!result?.palette?.length) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <p className='text-sm text-slate-600'>
        Colori rilevati: {result.totalColors} • Sample: {result.sampleSize}px • Ignora trasparenza: {result.ignoreTransparency ? 'Sì' : 'No'}
      </p>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {result.palette.map((color) => (
          <div
            key={color.hex}
            className='rounded-xl border border-slate-200 overflow-hidden shadow-sm'
          >
            <div
              className='h-20'
              style={{ backgroundColor: color.hex }}
            />
            <div className='p-3 text-sm text-slate-700 space-y-1'>
              <p className='font-semibold'>{color.hex}</p>
              <p>Occorrenze: {color.occurrences}</p>
              <p>Percentuale: {color.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const definition = {
  id: 'image-color-palette',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Immagine di riferimento',
      helperText: 'PNG, JPG, WebP, AVIF',
      accept: 'image/*',
      required: true,
    },
    {
      type: 'number',
      name: 'count',
      label: 'Numero colori da estrarre',
      defaultValue: 5,
      min: 1,
      max: 16,
    },
    {
      type: 'number',
      name: 'sampleSize',
      label: 'Risoluzione campione',
      defaultValue: 64,
      min: 1,
      max: 199,
      helperText: 'Più alto = maggiore precisione ma elaborazione più lenta',
    },
    {
      type: 'checkbox',
      name: 'ignoreTransparency',
      label: 'Ignora pixel trasparenti',
      defaultValue: 'true',
    },
  ],
  ResultView,
  ctaLabel: 'Estrai palette',
};

export default definition;

