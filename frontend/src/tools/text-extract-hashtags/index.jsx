// 🔧 File: frontend/src/tools/text-extract-hashtags/index.jsx
// 🔗 NeoPanze — Extract Hashtags

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900'>
          Hashtag trovati: <span className='text-indigo-600'>{result.count}</span>
        </p>
      </div>
      
      {result.count > 0 ? (
        <div className='space-y-2'>
          <h3 className='font-semibold text-slate-900'>Elenco hashtag:</h3>
          <div className='flex flex-wrap gap-2'>
            {result.hashtags.map((hashtag, index) => (
              <span 
                key={index} 
                className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium'
              >
                {hashtag}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <p className='text-slate-500'>Nessun hashtag trovato nel testo.</p>
      )}
    </div>
  );
}

const definition = {
  id: 'text-extract-hashtags',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da analizzare',
      placeholder: 'Inserisci il testo da cui estrarre gli hashtag (es. #tag #example)...',
      rows: 8,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Estrai hashtag',
};

export default definition;

