// 🔧 File: frontend/src/tools/math-percentage-to-decimal/index.jsx
// 🔗 NeoPanze — Percentage to Decimal

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
      <p className='font-semibold text-indigo-900 mb-2'>
        {result.direction === 'percent-to-decimal'
          ? `${result.percent}% = ${result.formatted}`
          : `${result.decimal} = ${result.formatted}`
        }
      </p>
      <p className='text-2xl font-bold text-indigo-600'>{result.formatted}</p>
    </div>
  );
}

const definition = {
  id: 'math-percentage-to-decimal',
  fields: [
    {
      type: 'select',
      name: 'direction',
      label: 'Direzione',
      options: [
        { value: 'percent-to-decimal', label: 'Percentuale → Decimale' },
        { value: 'decimal-to-percent', label: 'Decimale → Percentuale' },
      ],
      defaultValue: 'percent-to-decimal',
    },
    {
      type: 'number',
      name: 'input',
      label: 'Valore',
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Converti',
};

export default definition;


