// 🔧 File: frontend/src/tools/math-factorial-calculator/index.jsx
// 🔗 NeoPanze — Factorial Calculator

import React from 'react';

function ResultView({ result }) {
  if (!result?.factorial) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>
          {result.number}! = {result.scientific || result.factorial}
        </p>
        <p className='text-sm text-indigo-600'>
          Cifre: {result.digits}
        </p>
      </div>
      {result.digits > 20 && (
        <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-48 break-all'>
          {result.factorial}
        </pre>
      )}
    </div>
  );
}

const definition = {
  id: 'math-factorial-calculator',
  fields: [
    {
      type: 'number',
      name: 'number',
      label: 'Numero',
      required: true,
      min: 0,
      max: 170,
      helperText: 'Massimo 170 (limite JavaScript)',
    },
  ],
  ResultView,
  ctaLabel: 'Calcola Fattoriale',
};

export default definition;


