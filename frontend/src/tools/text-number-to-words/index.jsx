// 🔧 File: frontend/src/tools/text-number-to-words/index.jsx
// 🔗 NeoPanze — Number to Words

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>Risultato conversione:</p>
        <div className='bg-white p-4 rounded border border-indigo-200 text-center'>
          <p className='text-2xl font-bold text-indigo-600 mb-2 capitalize'>
            {result.words}
          </p>
          <p className='text-sm text-slate-500'>
            Numero: <span className='font-semibold'>{result.number}</span>
          </p>
          <p className='text-xs text-slate-400 mt-1'>
            Lingua: {result.language === 'it' ? 'Italiano' : 'English'}
          </p>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-number-to-words',
  fields: [
    {
      type: 'text',
      name: 'input',
      label: 'Numero',
      placeholder: 'Es: 42, 123, 1999...',
      required: true,
    },
    {
      type: 'select',
      name: 'language',
      label: 'Lingua',
      options: [
        { value: 'en', label: 'English' },
        { value: 'it', label: 'Italiano' },
      ],
      defaultValue: 'en',
    },
  ],
  ResultView,
  ctaLabel: 'Converti',
};

export default definition;

