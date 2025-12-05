// 🔧 File: frontend/src/tools/math-gcd-lcm-calculator/index.jsx
// 🔗 NeoPanze — GCD/LCM Calculator

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>{result.formula}</p>
        <div className='grid grid-cols-2 gap-3 mt-3'>
          <div className='bg-white p-3 rounded border'>
            <p className='text-xs text-slate-500'>MCD</p>
            <p className='text-xl font-bold'>{result.gcd}</p>
          </div>
          <div className='bg-white p-3 rounded border'>
            <p className='text-xs text-slate-500'>mcm</p>
            <p className='text-xl font-bold'>{result.lcm}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'math-gcd-lcm-calculator',
  fields: [
    {
      type: 'number',
      name: 'number1',
      label: 'Primo numero',
      required: true,
    },
    {
      type: 'number',
      name: 'number2',
      label: 'Secondo numero',
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Calcola',
};

export default definition;


