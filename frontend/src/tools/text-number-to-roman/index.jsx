// 🔧 File: frontend/src/tools/text-number-to-roman/index.jsx
// 🔗 NeoPanze — Number to Roman

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
          <p className='text-4xl font-bold text-indigo-600 mb-2'>{result.roman}</p>
          <p className='text-sm text-slate-500'>
            Numero: <span className='font-semibold'>{result.number}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-number-to-roman',
  fields: [
    {
      type: 'text',
      name: 'input',
      label: 'Numero (1-3999)',
      placeholder: 'Es: 4, 47, 1999...',
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Converti',
};

export default definition;

