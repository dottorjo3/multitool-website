// 🔧 File: frontend/src/tools/text-roman-to-number/index.jsx
// 🔗 NeoPanze — Roman to Number

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
          <p className='text-4xl font-bold text-indigo-600 mb-2'>{result.number}</p>
          <p className='text-sm text-slate-500'>
            Numero romano: <span className='font-mono'>{result.roman}</span>
          </p>
        </div>
        {!result.isValid && (
          <p className='mt-2 text-xs text-amber-600'>
            ⚠️ Il numero romano potrebbe non essere valido
          </p>
        )}
      </div>
    </div>
  );
}

const definition = {
  id: 'text-roman-to-number',
  fields: [
    {
      type: 'text',
      name: 'input',
      label: 'Numero romano',
      placeholder: 'Es: IV, XLVII, MCMXCIX...',
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Converti',
};

export default definition;

