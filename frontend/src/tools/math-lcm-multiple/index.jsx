// 🔧 File: frontend/src/tools/math-lcm-multiple/index.jsx
// 🔗 NeoPanze — LCM Multiple

import React from 'react';

function ResultView({ result }) {
  if (!result?.lcm) {
    return null;
  }

  return (
    <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
      <p className='font-semibold text-indigo-900 mb-2'>{result.formula}</p>
      <p className='text-3xl font-bold text-indigo-600'>{result.lcm}</p>
    </div>
  );
}

const definition = {
  id: 'math-lcm-multiple',
  fields: [
    {
      type: 'textarea',
      name: 'numbers',
      label: 'Numeri',
      placeholder: '12, 18, 24',
      required: true,
      helperText: 'Separati da virgola (minimo 2 numeri)',
    },
  ],
  ResultView,
  ctaLabel: 'Calcola mcm',
};

export default definition;


