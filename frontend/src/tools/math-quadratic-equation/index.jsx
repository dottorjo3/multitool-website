// 🔧 File: frontend/src/tools/math-quadratic-equation/index.jsx
// 🔗 NeoPanze — Quadratic Equation

import React from 'react';

function ResultView({ result }) {
  if (!result?.solutions) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>{result.equation}</p>
        <p className='text-sm text-indigo-600'>
          Discriminante: {result.discriminant} • Soluzioni: {result.solutionCount}
        </p>
      </div>
      <div>
        <p className='font-semibold text-slate-900 mb-2'>Soluzioni:</p>
        <div className='space-y-2'>
          {result.solutions.map((sol, idx) => (
            <div key={idx} className='p-3 bg-slate-50 rounded border'>
              <p className='font-mono text-lg'>x{idx + 1} = {sol}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'math-quadratic-equation',
  fields: [
    {
      type: 'number',
      name: 'a',
      label: 'Coefficiente a',
      required: true,
      helperText: 'Coefficiente di x²',
    },
    {
      type: 'number',
      name: 'b',
      label: 'Coefficiente b',
      required: true,
      helperText: 'Coefficiente di x',
    },
    {
      type: 'number',
      name: 'c',
      label: 'Coefficiente c',
      required: true,
      helperText: 'Termine noto',
    },
  ],
  ResultView,
  ctaLabel: 'Risolvi',
};

export default definition;


