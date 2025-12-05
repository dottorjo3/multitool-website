// 🔧 File: frontend/src/tools/math-percentage-of-total/index.jsx
// 🔗 NeoPanze — Percentage of Total

import React from 'react';

function ResultView({ result }) {
  if (!result?.percentage) {
    return null;
  }

  return (
    <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
      <p className='font-semibold text-indigo-900 mb-2'>
        {result.part} su {result.total} = {result.formatted}
      </p>
      <p className='text-3xl font-bold text-indigo-600'>{result.formatted}</p>
      <div className='mt-3 text-sm text-slate-600'>
        <p>Rimane: {result.remaining} ({result.remainingPercent}%)</p>
      </div>
    </div>
  );
}

const definition = {
  id: 'math-percentage-of-total',
  fields: [
    {
      type: 'number',
      name: 'part',
      label: 'Parte',
      required: true,
    },
    {
      type: 'number',
      name: 'total',
      label: 'Totale',
      required: true,
      min: 1,
    },
  ],
  ResultView,
  ctaLabel: 'Calcola',
};

export default definition;


