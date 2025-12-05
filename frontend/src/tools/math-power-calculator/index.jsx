// 🔧 File: frontend/src/tools/math-power-calculator/index.jsx
// 🔗 NeoPanze — Power Calculator

import React from 'react';

function ResultView({ result }) {
  if (!result?.result) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>{result.formula}</p>
        <p className='text-3xl font-bold text-indigo-600'>
          {result.scientific || result.formatted}
        </p>
      </div>
    </div>
  );
}

const definition = {
  id: 'math-power-calculator',
  fields: [
    {
      type: 'number',
      name: 'base',
      label: 'Base',
      required: true,
    },
    {
      type: 'number',
      name: 'exponent',
      label: 'Esponente',
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Calcola Potenza',
};

export default definition;


