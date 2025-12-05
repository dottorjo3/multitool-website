// 🔧 File: frontend/src/tools/math-age-calculator/index.jsx
// 🔗 NeoPanze — Age Calculator

import React from 'react';

function ResultView({ result }) {
  if (!result?.age) {
    return null;
  }

  return (
    <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
      <p className='font-semibold text-indigo-900 mb-2'>Età Calcolata</p>
      <p className='text-3xl font-bold text-indigo-600'>{result.age.formatted}</p>
      <div className='mt-3 text-sm text-indigo-700 space-y-1'>
        <p>Anni: {result.age.years}</p>
        <p>Mesi: {result.age.months}</p>
        <p>Giorni totali: {result.age.totalDays}</p>
      </div>
    </div>
  );
}

const definition = {
  id: 'math-age-calculator',
  fields: [
    {
      type: 'date',
      name: 'birthDate',
      label: 'Data di nascita',
      required: true,
    },
    {
      type: 'date',
      name: 'referenceDate',
      label: 'Data di riferimento (opzionale)',
      helperText: 'Lascia vuoto per usare la data odierna',
    },
  ],
  ResultView,
  ctaLabel: 'Calcola Età',
};

export default definition;


