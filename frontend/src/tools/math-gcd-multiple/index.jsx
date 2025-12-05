// 🔧 File: frontend/src/tools/math-gcd-multiple/index.jsx
// 🔗 NeoPanze — GCD Multiple

import React from 'react';

function ResultView({ result }) {
  if (!result?.gcd) {
    return null;
  }

  return (
    <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
      <p className='font-semibold text-indigo-900 mb-2'>{result.formula}</p>
      <p className='text-3xl font-bold text-indigo-600'>{result.gcd}</p>
    </div>
  );
}

const definition = {
  id: 'math-gcd-multiple',
  fields: [
    {
      type: 'textarea',
      name: 'numbers',
      label: 'Numeri',
      placeholder: '48, 18, 24',
      required: true,
      helperText: 'Separati da virgola (minimo 2 numeri)',
    },
  ],
  ResultView,
  ctaLabel: 'Calcola MCD',
};

export default definition;


