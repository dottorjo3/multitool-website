// 🔧 File: frontend/src/tools/math-interest-calculator/index.jsx
// 🔗 NeoPanze — Interest Calculator

import React from 'react';

function ResultView({ result }) {
  if (!result?.total) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>{result.formula}</p>
        <p className='text-2xl font-bold text-indigo-600'>Totale: €{result.total}</p>
        <p className='text-lg text-indigo-700'>Interessi: €{result.interest}</p>
      </div>
    </div>
  );
}

const definition = {
  id: 'math-interest-calculator',
  fields: [
    {
      type: 'select',
      name: 'type',
      label: 'Tipo interesse',
      options: [
        { value: 'simple', label: 'Semplice' },
        { value: 'compound', label: 'Composto' },
      ],
      defaultValue: 'simple',
    },
    {
      type: 'number',
      name: 'principal',
      label: 'Capitale (€)',
      required: true,
      min: 1,
    },
    {
      type: 'number',
      name: 'rate',
      label: 'Tasso annuo (%)',
      required: true,
      min: 0,
      step: 0.1,
    },
    {
      type: 'number',
      name: 'years',
      label: 'Anni',
      required: true,
      min: 1,
    },
  ],
  ResultView,
  ctaLabel: 'Calcola',
};

export default definition;


