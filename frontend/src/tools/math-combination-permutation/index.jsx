// 🔧 File: frontend/src/tools/math-combination-permutation/index.jsx
// 🔗 NeoPanze — Combination/Permutation

import React from 'react';

function ResultView({ result }) {
  if (!result?.result) {
    return null;
  }

  return (
    <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
      <p className='font-semibold text-indigo-900 mb-2'>{result.formula}</p>
      <p className='text-2xl font-bold text-indigo-600'>{result.result}</p>
    </div>
  );
}

const definition = {
  id: 'math-combination-permutation',
  fields: [
    {
      type: 'select',
      name: 'type',
      label: 'Tipo',
      options: [
        { value: 'combination', label: 'Combinazione C(n,r)' },
        { value: 'permutation', label: 'Permutazione P(n,r)' },
      ],
      defaultValue: 'combination',
    },
    {
      type: 'number',
      name: 'n',
      label: 'n',
      required: true,
      min: 0,
    },
    {
      type: 'number',
      name: 'r',
      label: 'r',
      required: true,
      min: 0,
    },
  ],
  ResultView,
  ctaLabel: 'Calcola',
};

export default definition;


