// 🔧 File: frontend/src/tools/text-extract-numbers/index.jsx
// 🔗 NeoPanze — Extract Numbers

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg space-y-2'>
        <p className='font-semibold text-indigo-900'>
          Numeri trovati: <span className='text-indigo-600'>{result.count}</span>
        </p>
        {result.count > 0 && (
          <>
            <p className='text-indigo-700'>
              Somma: <span className='font-semibold'>{result.sum.toFixed(2)}</span>
            </p>
            <p className='text-indigo-700'>
              Media: <span className='font-semibold'>{result.average.toFixed(2)}</span>
            </p>
          </>
        )}
      </div>
      
      {result.count > 0 ? (
        <div className='space-y-2'>
          <h3 className='font-semibold text-slate-900'>Elenco numeri:</h3>
          <div className='max-h-96 overflow-y-auto border border-slate-200 rounded-lg p-4'>
            <div className='flex flex-wrap gap-2'>
              {result.numbers.map((num, index) => (
                <span 
                  key={index} 
                  className='px-3 py-1 bg-slate-100 text-slate-700 rounded text-sm font-mono'
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className='text-slate-500'>Nessun numero trovato nel testo.</p>
      )}
    </div>
  );
}

const definition = {
  id: 'text-extract-numbers',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da analizzare',
      placeholder: 'Inserisci il testo da cui estrarre i numeri...',
      rows: 8,
      required: true,
    },
    {
      type: 'checkbox',
      name: 'includeDecimals',
      label: 'Includi numeri decimali',
      defaultValue: 'true',
    },
    {
      type: 'checkbox',
      name: 'includeNegative',
      label: 'Includi numeri negativi',
      defaultValue: 'true',
    },
  ],
  ResultView,
  ctaLabel: 'Estrai numeri',
};

export default definition;

