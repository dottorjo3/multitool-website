// 🔧 File: frontend/src/tools/developer-slug-multi/index.jsx
// 🔗 NeoPanze — Slugify multiplo

import React from 'react';

function ResultView({ result }) {
  if (!result?.slugs) {
    return null;
  }

  return (
    <div className='space-y-3 text-sm text-slate-600'>
      <p>Separator: {result.separator} • Lowercase: {result.lowercase ? 'sì' : 'no'} • Keep accents: {result.keepAccents ? 'sì' : 'no'}</p>
      <div className='bg-slate-100 rounded-lg p-3 space-y-2'>
        {result.slugs.map((item) => (
          <div key={item.original} className='flex flex-col rounded-lg bg-white border border-slate-200 p-3 shadow-sm'>
            <span className='text-xs uppercase text-slate-500'>Originale</span>
            <span className='font-medium text-slate-700 break-all'>{item.original}</span>
            <span className='text-xs uppercase text-slate-500 mt-2'>Slug</span>
            <span className='font-mono text-sm text-indigo-600 break-all'>{item.slug}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const definition = {
  id: 'developer-slug-multi',
  fields: [
    {
      type: 'textarea',
      name: 'lines',
      label: 'Righe (una per slug)',
      placeholder: 'Titolo uno\nTitolo due\nTitolo tre',
      rows: 6,
      required: true,
    },
    {
      type: 'text',
      name: 'separator',
      label: 'Separatore',
      defaultValue: '-',
      maxLength: 3,
    },
    {
      type: 'checkbox',
      name: 'lowercase',
      label: 'Forza minuscole',
      defaultValue: 'true',
    },
    {
      type: 'checkbox',
      name: 'keepAccents',
      label: 'Mantieni accenti',
      defaultValue: 'false',
    },
  ],
  ResultView,
  ctaLabel: 'Genera slug',
};

export default definition;


