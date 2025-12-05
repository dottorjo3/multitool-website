// 🔧 File: frontend/src/tools/math-square-root-calculator/index.jsx
// 🔗 NeoPanze — Square Root Calculator

import React from 'react';

function ResultView({ result }) {
  if (!result?.squareRoot) {
    return null;
  }

  return (
    <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
      <p className='font-semibold text-indigo-900 mb-2'>√{result.number} = {result.formatted}</p>
      <p className='text-2xl font-bold text-indigo-600'>{result.formatted}</p>
    </div>
  );
}

const definition = {
  id: 'math-square-root-calculator',
  fields: [
    {
      type: 'number',
      name: 'number',
      label: 'Numero',
      required: true,
      min: 0,
    },
  ],
  ResultView,
  ctaLabel: 'Calcola Radice',
};

export default definition;


