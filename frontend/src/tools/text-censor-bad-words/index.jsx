// 🔧 File: frontend/src/tools/text-censor-bad-words/index.jsx
// 🔗 NeoPanze — Censor Bad Words

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>Testo censurato:</p>
        <div className='bg-white p-4 rounded border border-indigo-200'>
          <p className='text-slate-900 whitespace-pre-wrap break-words'>
            {result.censored}
          </p>
        </div>
        <div className='mt-3 text-xs text-indigo-700'>
          <p>Parole censurate: <span className='font-semibold'>{result.wordsCensored}</span></p>
          <p>Sostituzione: <span className='font-mono'>{result.replacement}</span></p>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-censor-bad-words',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da censurare',
      placeholder: 'Inserisci il testo...',
      rows: 8,
      required: true,
    },
    {
      type: 'text',
      name: 'customWords',
      label: 'Parole personalizzate (separate da virgola)',
      placeholder: 'parola1, parola2, ...',
    },
    {
      type: 'text',
      name: 'replacement',
      label: 'Carattere di sostituzione',
      placeholder: '*',
      defaultValue: '*',
    },
  ],
  ResultView,
  ctaLabel: 'Censura',
};

export default definition;

