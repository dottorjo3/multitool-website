// 🔧 File: frontend/src/tools/text-sentence-counter/index.jsx
// 🔗 NeoPanze — Conteggio frasi

import React from 'react';

function ResultView({ result }) {
  if (!result) return null;

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <div className='bg-indigo-50 text-indigo-700 rounded-xl p-4 text-center'>
          <p className='text-xs uppercase font-semibold'>Frasi</p>
          <p className='text-2xl font-bold mt-1'>{result.sentences}</p>
        </div>
        <div className='bg-emerald-50 text-emerald-700 rounded-xl p-4 text-center'>
          <p className='text-xs uppercase font-semibold'>Parole Totali</p>
          <p className='text-2xl font-bold mt-1'>{result.totalWords}</p>
        </div>
        <div className='bg-slate-100 text-slate-700 rounded-xl p-4 text-center'>
          <p className='text-xs uppercase font-semibold'>Media parole / frase</p>
          <p className='text-2xl font-bold mt-1'>{result.averageWordsPerSentence}</p>
        </div>
      </div>
      <div className='rounded-xl border border-slate-200 divide-y'>
        {result.sentencesDetail.map((item) => (
          <div key={item.index} className='px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
            <span className='font-semibold text-slate-700'>#{item.index}</span>
            <p className='flex-1 text-slate-600'>{item.text}</p>
            <span className='text-xs text-slate-500'>Parole: {item.wordCount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const definition = {
  id: 'text-sentence-counter',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo',
      placeholder: 'Scrivi o incolla del testo...',
      rows: 10,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Conta frasi',
};

export default definition;


