// 🔧 File: frontend/src/tools/math-fibonacci-generator/index.jsx
// 🔗 NeoPanze — Fibonacci Generator

import React from 'react';

function ResultView({ result }) {
  if (!result?.sequence) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>
          Sequenza Fibonacci ({result.count} numeri)
        </p>
        <p className='text-lg font-bold text-indigo-600'>
          Ultimo: {result.lastNumber} • Somma: {result.sum}
        </p>
      </div>
      <div className='flex flex-wrap gap-2 max-h-64 overflow-auto'>
        {result.sequence.map((num, idx) => (
          <span key={idx} className='px-2 py-1 bg-slate-100 text-slate-900 font-mono text-xs rounded border'>
            {num}
          </span>
        ))}
      </div>
    </div>
  );
}

const definition = {
  id: 'math-fibonacci-generator',
  fields: [
    {
      type: 'number',
      name: 'count',
      label: 'Numero di elementi',
      defaultValue: 10,
      min: 1,
      max: 1000,
    },
  ],
  ResultView,
  ctaLabel: 'Genera',
};

export default definition;


