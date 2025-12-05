// 🔧 File: frontend/src/tools/text-diff/index.jsx
// 🔗 NeoPanze — Text Diff

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-3'>Differenze trovate:</p>
        <div className='bg-white p-4 rounded border border-indigo-200'>
          <div className='space-y-2 font-mono text-xs'>
            {result.diff.map((part, index) => {
              if (part.added) {
                return (
                  <div key={index} className='bg-green-100 text-green-900 p-2 rounded border-l-4 border-green-500'>
                    <span className='font-semibold'>+</span> {part.value}
                  </div>
                );
              }
              if (part.removed) {
                return (
                  <div key={index} className='bg-red-100 text-red-900 p-2 rounded border-l-4 border-red-500'>
                    <span className='font-semibold'>-</span> {part.value}
                  </div>
                );
              }
              return (
                <div key={index} className='text-slate-600 p-2'>
                  {part.value}
                </div>
              );
            })}
          </div>
        </div>
        <div className='mt-3 grid grid-cols-2 gap-4 text-xs'>
          <div className='bg-white p-2 rounded border border-indigo-200'>
            <p className='text-slate-500'>Aggiunte</p>
            <p className='text-green-600 font-semibold'>{result.stats.added}</p>
          </div>
          <div className='bg-white p-2 rounded border border-indigo-200'>
            <p className='text-slate-500'>Rimosse</p>
            <p className='text-red-600 font-semibold'>{result.stats.removed}</p>
          </div>
          <div className='bg-white p-2 rounded border border-indigo-200'>
            <p className='text-slate-500'>Invariate</p>
            <p className='text-slate-600 font-semibold'>{result.stats.unchanged}</p>
          </div>
          <div className='bg-white p-2 rounded border border-indigo-200'>
            <p className='text-slate-500'>Totale modifiche</p>
            <p className='text-indigo-600 font-semibold'>{result.stats.totalChanges}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-diff',
  fields: [
    {
      type: 'textarea',
      name: 'text1',
      label: 'Primo testo',
      placeholder: 'Inserisci il primo testo...',
      rows: 6,
      required: true,
    },
    {
      type: 'textarea',
      name: 'text2',
      label: 'Secondo testo',
      placeholder: 'Inserisci il secondo testo...',
      rows: 6,
      required: true,
    },
    {
      type: 'select',
      name: 'diffType',
      label: 'Tipo di diff',
      options: [
        { value: 'lines', label: 'Per righe' },
        { value: 'words', label: 'Per parole' },
        { value: 'chars', label: 'Per caratteri' },
      ],
      defaultValue: 'lines',
    },
  ],
  ResultView,
  ctaLabel: 'Confronta testi',
};

export default definition;

