// 🔧 File: frontend/src/tools/math-time-calculator/index.jsx
// 🔗 NeoPanze — Time Calculator

import React from 'react';

function ResultView({ result }) {
  if (!result?.result) {
    return null;
  }

  return (
    <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
      <p className='font-semibold text-indigo-900 mb-2'>{result.formula}</p>
      <p className='text-2xl font-bold text-indigo-600'>{result.result}</p>
      <p className='text-sm text-indigo-600 mt-2'>Secondi: {result.seconds}</p>
    </div>
  );
}

const definition = {
  id: 'math-time-calculator',
  fields: [
    {
      type: 'select',
      name: 'operation',
      label: 'Operazione',
      options: [
        { value: 'add', label: 'Somma' },
        { value: 'subtract', label: 'Sottrai' },
        { value: 'difference', label: 'Differenza' },
      ],
      defaultValue: 'add',
    },
    {
      type: 'text',
      name: 'time1',
      label: 'Tempo 1',
      placeholder: 'HH:MM:SS o HH:MM',
      required: true,
    },
    {
      type: 'text',
      name: 'time2',
      label: 'Tempo 2',
      placeholder: 'HH:MM:SS o HH:MM',
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Calcola',
};

export default definition;


