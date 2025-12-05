// 🔧 File: frontend/src/tools/text-sort-paragraphs/index.jsx
// 🔗 NeoPanze — Sort Paragraphs

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>
          Paragrafi ordinati ({result.order === 'asc' ? 'A-Z' : 'Z-A'}):
        </p>
        <div className='bg-white p-4 rounded border border-indigo-200'>
          <p className='text-slate-900 whitespace-pre-wrap break-words'>
            {result.sorted}
          </p>
        </div>
        <p className='mt-3 text-xs text-indigo-700'>
          Paragrafi totali: <span className='font-semibold'>{result.paragraphCount}</span>
        </p>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-sort-paragraphs',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo con paragrafi',
      placeholder: 'Inserisci il testo con paragrafi separati da righe vuote...',
      rows: 10,
      required: true,
    },
    {
      type: 'select',
      name: 'order',
      label: 'Ordinamento',
      options: [
        { value: 'asc', label: 'Crescente (A-Z)' },
        { value: 'desc', label: 'Decrescente (Z-A)' },
      ],
      defaultValue: 'asc',
    },
  ],
  ResultView,
  ctaLabel: 'Ordina paragrafi',
};

export default definition;

