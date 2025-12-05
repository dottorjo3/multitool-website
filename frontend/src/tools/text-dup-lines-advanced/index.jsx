// 🔧 File: frontend/src/tools/text-dup-lines-advanced/index.jsx
// 🔗 NeoPanze — Duplicate Lines Advanced

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-3'>Righe duplicate trovate:</p>
        <div className='grid grid-cols-3 gap-3 mb-4'>
          <div className='bg-white p-2 rounded border border-indigo-200 text-center'>
            <p className='text-xs text-slate-500'>Totali</p>
            <p className='text-xl font-bold text-indigo-600'>{result.totalLines}</p>
          </div>
          <div className='bg-white p-2 rounded border border-indigo-200 text-center'>
            <p className='text-xs text-slate-500'>Uniche</p>
            <p className='text-xl font-bold text-green-600'>{result.uniqueLines}</p>
          </div>
          <div className='bg-white p-2 rounded border border-indigo-200 text-center'>
            <p className='text-xs text-slate-500'>Duplicate</p>
            <p className='text-xl font-bold text-red-600'>{result.duplicateLines}</p>
          </div>
        </div>
        {result.duplicates.length > 0 && (
          <div className='bg-white p-4 rounded border border-indigo-200 max-h-96 overflow-y-auto'>
            <div className='space-y-2'>
              {result.duplicates.map((dup, index) => (
                <div key={index} className='p-3 bg-red-50 rounded border border-red-200'>
                  <p className='font-semibold text-red-900 mb-1'>{dup.line}</p>
                  <div className='flex gap-4 text-xs text-red-700'>
                    <span>Occorrenze: <span className='font-bold'>{dup.count}</span></span>
                    <span>Righe: {dup.indices.join(', ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {result.stats.mostDuplicated && (
          <div className='mt-3 p-2 bg-amber-50 rounded border border-amber-200'>
            <p className='text-xs text-amber-800'>
              Più duplicata: <span className='font-semibold'>{result.stats.mostDuplicated.line}</span> 
              ({result.stats.mostDuplicated.count} volte)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const definition = {
  id: 'text-dup-lines-advanced',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da analizzare',
      placeholder: 'Inserisci il testo con righe da controllare...',
      rows: 10,
      required: true,
    },
    {
      type: 'checkbox',
      name: 'caseSensitive',
      label: 'Case sensitive',
      defaultValue: 'false',
    },
    {
      type: 'checkbox',
      name: 'trimWhitespace',
      label: 'Rimuovi spazi iniziali/finali',
      defaultValue: 'true',
    },
  ],
  ResultView,
  ctaLabel: 'Trova duplicati',
};

export default definition;

