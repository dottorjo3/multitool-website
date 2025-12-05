// 🔧 File: frontend/src/tools/text-leetify-2/index.jsx
// 🔗 NeoPanze — Leetify 2

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>Testo leetificato:</p>
        <div className='bg-white p-4 rounded border border-indigo-200'>
          <p className='font-mono text-slate-900 whitespace-pre-wrap break-words'>
            {result.leetified}
          </p>
        </div>
        <div className='mt-3 text-xs text-indigo-700'>
          <p>Livello: <span className='font-semibold'>{result.level}</span></p>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-leetify-2',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da leetificare',
      placeholder: 'Inserisci il testo...',
      rows: 8,
      required: true,
    },
    {
      type: 'select',
      name: 'level',
      label: 'Livello',
      options: [
        { value: 'low', label: 'Basso (30%)' },
        { value: 'medium', label: 'Medio (50%)' },
        { value: 'high', label: 'Alto (70%)' },
        { value: 'extreme', label: 'Estremo (90%)' },
      ],
      defaultValue: 'medium',
    },
  ],
  ResultView,
  ctaLabel: 'Leetifica',
};

export default definition;

