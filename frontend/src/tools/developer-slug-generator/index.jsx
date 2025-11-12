// 🔧 File: frontend/src/tools/developer-slug-generator/index.jsx
// 🔗 NeoPanze — Slug Generator

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-3 text-sm text-slate-600'>
      <p className='font-semibold text-slate-700'>Slug</p>
      <div className='bg-slate-900 text-slate-50 font-mono text-sm rounded-lg p-3 break-all'>
        {result.slug || '—'}
      </div>
      <p>Opzioni: separator = "{result.options.separator}", lowercase = {result.options.lowercase ? 'true' : 'false'}, keepAccents = {result.options.keepAccents ? 'true' : 'false'}</p>
    </div>
  );
}

const definition = {
  id: 'developer-slug-generator',
  fields: [
    {
      type: 'text',
      name: 'text',
      label: 'Testo',
      placeholder: 'Es. Bibble 2.0 — Tool Empire',
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


