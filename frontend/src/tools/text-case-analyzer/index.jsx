// 🔧 File: frontend/src/tools/text-case-analyzer/index.jsx
// 🔗 NeoPanze — Case Analyzer

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-3'>Analisi Case:</p>
        <div className='grid grid-cols-3 gap-4 mb-4'>
          <div className='bg-white p-3 rounded border border-indigo-200 text-center'>
            <p className='text-xs text-slate-500'>Uppercase</p>
            <p className='text-xl font-bold text-indigo-600'>{result.stats.uppercase}</p>
            <p className='text-xs text-indigo-700'>{result.percentages.uppercase}%</p>
          </div>
          <div className='bg-white p-3 rounded border border-indigo-200 text-center'>
            <p className='text-xs text-slate-500'>Lowercase</p>
            <p className='text-xl font-bold text-indigo-600'>{result.stats.lowercase}</p>
            <p className='text-xs text-indigo-700'>{result.percentages.lowercase}%</p>
          </div>
          <div className='bg-white p-3 rounded border border-indigo-200 text-center'>
            <p className='text-xs text-slate-500'>Mixed</p>
            <p className='text-xl font-bold text-indigo-600'>{result.stats.mixed}</p>
            <p className='text-xs text-indigo-700'>{result.percentages.mixed}%</p>
          </div>
        </div>
        <div className='text-xs text-indigo-700'>
          <p>Totale parole: <span className='font-semibold'>{result.stats.words}</span></p>
          <p>Caratteri: <span className='font-semibold'>{result.stats.characters}</span></p>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-case-analyzer',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da analizzare',
      placeholder: 'Inserisci il testo...',
      rows: 8,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Analizza',
};

export default definition;

