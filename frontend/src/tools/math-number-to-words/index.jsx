// 🔧 File: frontend/src/tools/math-number-to-words/index.jsx
// 🔗 NeoPanze — Number to Words

import React from 'react';

function ResultView({ result }) {
  if (!result?.words) {
    return null;
  }

  return (
    <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
      <p className='font-semibold text-indigo-900 mb-2'>
        {result.number} = {result.formatted}
      </p>
      <p className='text-xl font-bold text-indigo-600 capitalize'>{result.formatted}</p>
    </div>
  );
}

const definition = {
  id: 'math-number-to-words',
  fields: [
    {
      type: 'number',
      name: 'number',
      label: 'Numero',
      required: true,
      min: 1,
      max: 999999,
      helperText: 'Massimo 999999',
    },
  ],
  ResultView,
  ctaLabel: 'Converti',
};

export default definition;


