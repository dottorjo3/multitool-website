// 🔧 File: frontend/src/tools/text-token-counter/index.jsx
// 🔗 NeoPanze — Token Counter

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  const methodLabels = {
    words: 'Parole',
    characters: 'Caratteri',
    sentences: 'Frasi',
    paragraphs: 'Paragrafi',
  };

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-3'>
          Statistiche Token ({methodLabels[result.method]}):
        </p>
        <div className='grid grid-cols-2 gap-4'>
          <div className='bg-white p-3 rounded border border-indigo-200'>
            <p className='text-xs text-slate-500'>Totali</p>
            <p className='text-2xl font-bold text-indigo-600'>{result.totalTokens}</p>
          </div>
          <div className='bg-white p-3 rounded border border-indigo-200'>
            <p className='text-xs text-slate-500'>Unici</p>
            <p className='text-2xl font-bold text-indigo-600'>{result.uniqueTokens}</p>
          </div>
          <div className='bg-white p-3 rounded border border-indigo-200'>
            <p className='text-xs text-slate-500'>Lunghezza media</p>
            <p className='text-xl font-bold text-indigo-600'>{result.averageLength}</p>
          </div>
          <div className='bg-white p-3 rounded border border-indigo-200'>
            <p className='text-xs text-slate-500'>Min/Max</p>
            <p className='text-sm font-semibold text-indigo-600'>
              {result.minLength} / {result.maxLength}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-token-counter',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da analizzare',
      placeholder: 'Inserisci il testo...',
      rows: 8,
      required: true,
    },
    {
      type: 'select',
      name: 'method',
      label: 'Metodo di conteggio',
      options: [
        { value: 'words', label: 'Parole' },
        { value: 'characters', label: 'Caratteri' },
        { value: 'sentences', label: 'Frasi' },
        { value: 'paragraphs', label: 'Paragrafi' },
      ],
      defaultValue: 'words',
    },
  ],
  ResultView,
  ctaLabel: 'Conta token',
};

export default definition;

