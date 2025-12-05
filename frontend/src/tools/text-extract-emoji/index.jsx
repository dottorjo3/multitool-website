// 🔧 File: frontend/src/tools/text-extract-emoji/index.jsx
// 🔗 NeoPanze — Extract Emoji

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg space-y-2'>
        <p className='font-semibold text-indigo-900'>
          Emoji trovati: <span className='text-indigo-600'>{result.count}</span>
        </p>
        <p className='text-indigo-700'>
          Emoji unici: <span className='font-semibold'>{result.uniqueCount}</span>
        </p>
      </div>
      
      {result.count > 0 ? (
        <div className='space-y-4'>
          <div>
            <h3 className='font-semibold text-slate-900 mb-2'>Elenco emoji (per frequenza):</h3>
            <div className='max-h-96 overflow-y-auto border border-slate-200 rounded-lg p-4'>
              <div className='flex flex-wrap gap-2'>
                {result.frequency.map((item, index) => (
                  <div 
                    key={index} 
                    className='flex items-center gap-2 px-3 py-2 bg-slate-50 rounded border border-slate-200'
                  >
                    <span className='text-2xl'>{item.emoji}</span>
                    <span className='text-xs text-slate-500'>({item.count}x)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className='font-semibold text-slate-900 mb-2'>Tutti gli emoji unici:</h3>
            <div className='flex flex-wrap gap-2'>
              {Array.from(new Set(result.emojis)).map((emoji, index) => (
                <span 
                  key={index} 
                  className='text-3xl'
                  title={emoji}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className='text-slate-500'>Nessun emoji trovato nel testo.</p>
      )}
    </div>
  );
}

const definition = {
  id: 'text-extract-emoji',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da analizzare',
      placeholder: 'Inserisci il testo da cui estrarre gli emoji...',
      rows: 8,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Estrai emoji',
};

export default definition;

