// 🔧 File: frontend/src/tools/text-extract-urls/index.jsx
// 🔗 NeoPanze — Extract URLs

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900'>
          URL trovati: <span className='text-indigo-600'>{result.count}</span>
        </p>
      </div>
      
      {result.count > 0 ? (
        <div className='space-y-2'>
          <h3 className='font-semibold text-slate-900'>Elenco URL:</h3>
          <div className='max-h-96 overflow-y-auto border border-slate-200 rounded-lg p-4 space-y-2'>
            {result.urls.map((url, index) => (
              <div key={index} className='p-2 bg-slate-50 rounded border border-slate-200'>
                <a 
                  href={url} 
                  target='_blank' 
                  rel='noopener noreferrer'
                  className='font-mono text-sm text-indigo-600 hover:text-indigo-800 break-all'
                >
                  {url}
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className='text-slate-500'>Nessun URL trovato nel testo.</p>
      )}
    </div>
  );
}

const definition = {
  id: 'text-extract-urls',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da analizzare',
      placeholder: 'Inserisci il testo da cui estrarre gli URL...',
      rows: 8,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Estrai URL',
};

export default definition;

