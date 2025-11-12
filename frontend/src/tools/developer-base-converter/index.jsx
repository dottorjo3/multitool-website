// 🔧 File: frontend/src/tools/developer-base-converter/index.jsx
// 🔗 NeoPanze — Base Converter

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-3 text-sm text-slate-600'>
      <p>Valore decimale: <span className='font-mono text-slate-900'>{result.decimal}</span></p>
      <div className='bg-slate-900 text-slate-50 font-mono text-sm rounded-lg p-3 break-all'>
        {result.output}
      </div>
    </div>
  );
}

const definition = {
  id: 'developer-base-converter',
  fields: [
    {
      type: 'text',
      name: 'value',
      label: 'Numero',
      placeholder: 'Es. FF oppure 101010',
      required: true,
    },
    {
      type: 'number',
      name: 'fromBase',
      label: 'Base di origine',
      defaultValue: 16,
      min: 2,
      max: 36,
    },
    {
      type: 'number',
      name: 'toBase',
      label: 'Base di destinazione',
      defaultValue: 10,
      min: 2,
      max: 36,
    },
  ],
  ResultView,
  ctaLabel: 'Converti base',
};

export default definition;

