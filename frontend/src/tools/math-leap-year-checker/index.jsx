// 🔧 File: frontend/src/tools/math-leap-year-checker/index.jsx
// 🔗 NeoPanze — Leap Year Checker

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className={`p-4 bg-${result.isLeapYear ? 'green' : 'red'}-50 border border-${result.isLeapYear ? 'green' : 'red'}-100 rounded-lg`}>
      <p className={`font-semibold text-${result.isLeapYear ? 'green' : 'red'}-900 mb-2`}>
        {result.message}
      </p>
      <p className='text-sm text-slate-600'>
        Giorni nell'anno: {result.daysInYear} • Prossimo anno bisestile: {result.nextLeapYear}
      </p>
    </div>
  );
}

const definition = {
  id: 'math-leap-year-checker',
  fields: [
    {
      type: 'number',
      name: 'year',
      label: 'Anno',
      required: true,
      min: 1,
    },
  ],
  ResultView,
  ctaLabel: 'Verifica',
};

export default definition;


