// 🔧 File: frontend/src/tools/math-circle-calculator/index.jsx
// 🔗 NeoPanze — Circle Calculator

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-3'>Cerchio (raggio: {result.radius})</p>
        <div className='grid grid-cols-2 gap-3'>
          {result.area && (
            <div className='bg-white p-3 rounded border'>
              <p className='text-xs text-slate-500'>Area</p>
              <p className='text-xl font-bold'>{result.area}</p>
            </div>
          )}
          {result.circumference && (
            <div className='bg-white p-3 rounded border'>
              <p className='text-xs text-slate-500'>Circonferenza</p>
              <p className='text-xl font-bold'>{result.circumference}</p>
            </div>
          )}
        </div>
        <p className='text-xs text-slate-500 mt-2'>Diametro: {result.diameter}</p>
      </div>
    </div>
  );
}

const definition = {
  id: 'math-circle-calculator',
  fields: [
    {
      type: 'number',
      name: 'radius',
      label: 'Raggio',
      required: true,
      min: 0,
    },
    {
      type: 'select',
      name: 'calculate',
      label: 'Calcola',
      options: [
        { value: 'area', label: 'Area' },
        { value: 'circumference', label: 'Circonferenza' },
        { value: 'both', label: 'Entrambi' },
      ],
      defaultValue: 'both',
    },
  ],
  ResultView,
  ctaLabel: 'Calcola',
};

export default definition;


