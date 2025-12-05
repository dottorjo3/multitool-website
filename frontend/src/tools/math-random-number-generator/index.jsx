// 🔧 File: frontend/src/tools/math-random-number-generator/index.jsx
// 🔗 NeoPanze — Random Number Generator

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.numbers) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.numbers.join(', '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>
          Generati {result.count} numero/i casuale/i
        </p>
        <p className='text-sm text-indigo-600'>
          Range: {result.min} - {result.max} ({result.integer ? 'interi' : 'decimali'})
        </p>
      </div>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>Numeri generati</p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia'}
        </button>
      </div>
      <div className='flex flex-wrap gap-2'>
        {result.formatted.map((num, idx) => (
          <span key={idx} className='px-3 py-2 bg-slate-100 text-slate-900 font-mono rounded border'>
            {num}
          </span>
        ))}
      </div>
    </div>
  );
}

const definition = {
  id: 'math-random-number-generator',
  fields: [
    {
      type: 'number',
      name: 'min',
      label: 'Minimo',
      defaultValue: 0,
      required: true,
    },
    {
      type: 'number',
      name: 'max',
      label: 'Massimo',
      defaultValue: 100,
      required: true,
    },
    {
      type: 'number',
      name: 'count',
      label: 'Quantità',
      defaultValue: 1,
      min: 1,
      max: 1000,
    },
    {
      type: 'checkbox',
      name: 'integer',
      label: 'Solo numeri interi',
      defaultValue: 'true',
    },
  ],
  ResultView,
  ctaLabel: 'Genera',
};

export default definition;


