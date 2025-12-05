// 🔧 File: frontend/src/tools/developer-binary-converter/index.jsx
// 🔗 NeoPanze — Binary Converter

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-3'>Risultati conversione:</p>
        <div className='grid grid-cols-2 gap-4'>
          <div className='bg-white p-3 rounded border border-indigo-200'>
            <p className='text-xs text-slate-500'>Decimale</p>
            <p className='text-lg font-bold text-indigo-600 font-mono'>{result.decimal}</p>
          </div>
          <div className='bg-white p-3 rounded border border-indigo-200'>
            <p className='text-xs text-slate-500'>Binario</p>
            <p className='text-lg font-bold text-indigo-600 font-mono'>{result.binary}</p>
          </div>
          <div className='bg-white p-3 rounded border border-indigo-200'>
            <p className='text-xs text-slate-500'>Ottale</p>
            <p className='text-lg font-bold text-indigo-600 font-mono'>{result.octal}</p>
          </div>
          <div className='bg-white p-3 rounded border border-indigo-200'>
            <p className='text-xs text-slate-500'>Esadecimale</p>
            <p className='text-lg font-bold text-indigo-600 font-mono'>{result.hex}</p>
          </div>
        </div>
        <div className='mt-3 p-3 bg-indigo-100 rounded border border-indigo-200'>
          <p className='text-sm font-semibold text-indigo-900'>Output ({result.fromBase} → {result.toBase}):</p>
          <p className='text-lg font-mono text-indigo-700 break-all'>{result.converted}</p>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'developer-binary-converter',
  fields: [
    {
      type: 'text',
      name: 'input',
      label: 'Numero',
      placeholder: 'Es: 255, FF, 11111111...',
      required: true,
    },
    {
      type: 'select',
      name: 'fromBase',
      label: 'Base di origine',
      options: [
        { value: '2', label: '2 (Binario)' },
        { value: '8', label: '8 (Ottale)' },
        { value: '10', label: '10 (Decimale)' },
        { value: '16', label: '16 (Esadecimale)' },
      ],
      defaultValue: '10',
    },
    {
      type: 'select',
      name: 'toBase',
      label: 'Base di destinazione',
      options: [
        { value: '2', label: '2 (Binario)' },
        { value: '8', label: '8 (Ottale)' },
        { value: '10', label: '10 (Decimale)' },
        { value: '16', label: '16 (Esadecimale)' },
      ],
      defaultValue: '2',
    },
  ],
  ResultView,
  ctaLabel: 'Converti',
};

export default definition;


