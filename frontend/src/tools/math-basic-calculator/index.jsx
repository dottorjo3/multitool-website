// 🔧 File: frontend/src/tools/math-basic-calculator/index.jsx
// 🔗 NeoPanze — Basic Calculator

import React from 'react';

function ResultView({ result }) {
  if (!result?.result) {
    return null;
  }

  return (
    <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
      <p className='text-sm text-indigo-600 mb-1'>Risultato:</p>
      <p className='text-3xl font-bold text-indigo-900'>{result.formatted}</p>
      <p className='text-xs text-indigo-500 mt-2'>{result.expression} = {result.formatted}</p>
    </div>
  );
}

const definition = {
  id: 'math-basic-calculator',
  fields: [
    {
      type: 'text',
      name: 'expression',
      label: 'Espressione matematica',
      placeholder: '2 + 2, 10 * 5, sqrt(16), etc.',
      required: true,
      helperText: 'Supporta operazioni base, funzioni (sqrt, sin, cos, etc.)',
    },
  ],
  ResultView,
  ctaLabel: 'Calcola',
};

export default definition;


