// 🔧 File: frontend/src/tools/math-date-difference/index.jsx
// 🔗 NeoPanze — Date Difference

import React from 'react';

function ResultView({ result }) {
  if (!result?.difference) {
    return null;
  }

  return (
    <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
      <p className='font-semibold text-indigo-900 mb-2'>Differenza</p>
      <p className='text-2xl font-bold text-indigo-600'>{result.difference.formatted}</p>
      <div className='mt-3 text-sm text-indigo-700 space-y-1'>
        <p>Data 1: {result.date1}</p>
        <p>Data 2: {result.date2}</p>
        <p>Giorni: {result.difference.days}</p>
        <p>Ore: {result.difference.hours}</p>
      </div>
    </div>
  );
}

const definition = {
  id: 'math-date-difference',
  fields: [
    {
      type: 'datetime-local',
      name: 'date1',
      label: 'Prima data',
      required: true,
    },
    {
      type: 'datetime-local',
      name: 'date2',
      label: 'Seconda data',
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Calcola Differenza',
};

export default definition;


