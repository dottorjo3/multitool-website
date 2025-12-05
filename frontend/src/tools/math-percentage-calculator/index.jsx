// 🔧 File: frontend/src/tools/math-percentage-calculator/index.jsx
// 🔗 NeoPanze — Percentage Calculator

import React from 'react';

function ResultView({ result }) {
  if (!result?.result) {
    return null;
  }

  return (
    <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
      <p className='font-semibold text-indigo-900 mb-2'>{result.formula}</p>
      <p className='text-2xl font-bold text-indigo-600'>{result.formatted}</p>
    </div>
  );
}

const definition = {
  id: 'math-percentage-calculator',
  fields: [
    {
      type: 'select',
      name: 'operation',
      label: 'Operazione',
      options: [
        { value: 'percent-of', label: 'X percento di Y' },
        { value: 'percent-change', label: 'Variazione percentuale' },
        { value: 'percent-increase', label: 'Aumento percentuale' },
        { value: 'percent-decrease', label: 'Diminuzione percentuale' },
      ],
      defaultValue: 'percent-of',
    },
    {
      type: 'number',
      name: 'value1',
      label: 'Valore 1',
      required: true,
    },
    {
      type: 'number',
      name: 'value2',
      label: 'Valore 2',
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Calcola',
};

export default definition;


