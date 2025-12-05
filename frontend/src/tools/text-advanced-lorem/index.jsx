// 🔧 File: frontend/src/tools/text-advanced-lorem/index.jsx
// 🔗 NeoPanze — Advanced Lorem Ipsum

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>Lorem Ipsum generato:</p>
        <div className='bg-white p-4 rounded border border-indigo-200'>
          <p className='text-slate-900 whitespace-pre-wrap break-words'>
            {result.lorem}
          </p>
        </div>
        <div className='mt-3 flex gap-4 text-xs text-indigo-700'>
          <span>Tipo: <span className='font-semibold'>{result.type}</span></span>
          <span>Quantità: <span className='font-semibold'>{result.count}</span></span>
          <span>Lunghezza: <span className='font-semibold'>{result.length} caratteri</span></span>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-advanced-lorem',
  fields: [
    {
      type: 'select',
      name: 'type',
      label: 'Tipo',
      options: [
        { value: 'words', label: 'Parole' },
        { value: 'sentences', label: 'Frasi' },
        { value: 'paragraphs', label: 'Paragrafi' },
      ],
      defaultValue: 'words',
    },
    {
      type: 'text',
      name: 'count',
      label: 'Quantità',
      placeholder: '50',
      defaultValue: '50',
    },
    {
      type: 'checkbox',
      name: 'startWithLorem',
      label: 'Inizia con "Lorem ipsum"',
      defaultValue: 'true',
    },
  ],
  ResultView,
  ctaLabel: 'Genera Lorem Ipsum',
};

export default definition;

