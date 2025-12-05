// 🔧 File: frontend/src/tools/math-sequence-generator/index.jsx
// 🔗 NeoPanze — Sequence Generator

import React from 'react';

function ResultView({ result }) {
  if (!result?.sequence) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>
          Sequenza {result.type} ({result.count} elementi)
        </p>
        <p className='text-sm text-indigo-600'>
          Primo: {result.first} • Ultimo: {result.last} • Somma: {result.sum}
        </p>
      </div>
      <div className='flex flex-wrap gap-2 max-h-64 overflow-auto'>
        {result.sequence.slice(0, 50).map((num, idx) => (
          <span key={idx} className='px-2 py-1 bg-slate-100 text-slate-900 font-mono text-xs rounded border'>
            {num}
          </span>
        ))}
        {result.sequence.length > 50 && (
          <span className='text-xs text-slate-500'>... e altri {result.sequence.length - 50}</span>
        )}
      </div>
    </div>
  );
}

const definition = {
  id: 'math-sequence-generator',
  fields: [
    {
      type: 'select',
      name: 'type',
      label: 'Tipo sequenza',
      options: [
        { value: 'arithmetic', label: 'Aritmetica' },
        { value: 'geometric', label: 'Geometrica' },
        { value: 'square', label: 'Quadrati' },
        { value: 'cube', label: 'Cubi' },
      ],
      defaultValue: 'arithmetic',
    },
    {
      type: 'number',
      name: 'start',
      label: 'Valore iniziale',
      defaultValue: 1,
    },
    {
      type: 'number',
      name: 'count',
      label: 'Numero elementi',
      defaultValue: 10,
      min: 1,
      max: 1000,
    },
    {
      type: 'number',
      name: 'step',
      label: 'Passo/Rapporto',
      defaultValue: 1,
    },
  ],
  ResultView,
  ctaLabel: 'Genera',
};

export default definition;


