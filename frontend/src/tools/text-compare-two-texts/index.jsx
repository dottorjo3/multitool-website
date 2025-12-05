// 🔧 File: frontend/src/tools/text-compare-two-texts/index.jsx
// 🔗 NeoPanze — Compare Two Texts

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-3'>Statistiche confronto:</p>
        <div className='grid grid-cols-2 gap-4 mb-4'>
          <div className='bg-white p-3 rounded border border-indigo-200'>
            <p className='text-xs text-slate-500'>Testo 1</p>
            <p className='text-lg font-bold text-indigo-600'>{result.stats.text1Words} parole</p>
            <p className='text-xs text-slate-400'>{result.stats.text1Length} caratteri</p>
          </div>
          <div className='bg-white p-3 rounded border border-indigo-200'>
            <p className='text-xs text-slate-500'>Testo 2</p>
            <p className='text-lg font-bold text-indigo-600'>{result.stats.text2Words} parole</p>
            <p className='text-xs text-slate-400'>{result.stats.text2Length} caratteri</p>
          </div>
        </div>
        <div className='grid grid-cols-3 gap-3'>
          <div className='bg-green-50 p-2 rounded border border-green-200'>
            <p className='text-xs text-green-700'>Aggiunte</p>
            <p className='text-lg font-bold text-green-600'>{result.stats.added}</p>
          </div>
          <div className='bg-red-50 p-2 rounded border border-red-200'>
            <p className='text-xs text-red-700'>Rimosse</p>
            <p className='text-lg font-bold text-red-600'>{result.stats.removed}</p>
          </div>
          <div className='bg-indigo-50 p-2 rounded border border-indigo-200'>
            <p className='text-xs text-indigo-700'>Similarità</p>
            <p className='text-lg font-bold text-indigo-600'>{result.stats.similarity}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-compare-two-texts',
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
  ],
  ResultView,
  ctaLabel: 'Confronta',
};

export default definition;

