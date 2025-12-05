// 🔧 File: frontend/src/tools/math-statistics-calculator/index.jsx
// 🔗 NeoPanze — Statistics Calculator

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-3'>Statistiche</p>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
          <div className='bg-white p-2 rounded border'>
            <p className='text-xs text-slate-500'>Media</p>
            <p className='text-lg font-bold'>{result.mean}</p>
          </div>
          <div className='bg-white p-2 rounded border'>
            <p className='text-xs text-slate-500'>Mediana</p>
            <p className='text-lg font-bold'>{result.median}</p>
          </div>
          <div className='bg-white p-2 rounded border'>
            <p className='text-xs text-slate-500'>Min</p>
            <p className='text-lg font-bold'>{result.min}</p>
          </div>
          <div className='bg-white p-2 rounded border'>
            <p className='text-xs text-slate-500'>Max</p>
            <p className='text-lg font-bold'>{result.max}</p>
          </div>
        </div>
        <div className='mt-3 grid grid-cols-2 gap-2 text-sm'>
          <p>Somma: <span className='font-semibold'>{result.sum}</span></p>
          <p>Conteggio: <span className='font-semibold'>{result.count}</span></p>
          <p>Deviazione std: <span className='font-semibold'>{result.stdDev}</span></p>
          <p>Varianza: <span className='font-semibold'>{result.variance}</span></p>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'math-statistics-calculator',
  fields: [
    {
      type: 'textarea',
      name: 'numbers',
      label: 'Numeri',
      placeholder: '1, 2, 3, 4, 5',
      required: true,
      helperText: 'Separati da virgola',
    },
  ],
  ResultView,
  ctaLabel: 'Calcola Statistiche',
};

export default definition;


