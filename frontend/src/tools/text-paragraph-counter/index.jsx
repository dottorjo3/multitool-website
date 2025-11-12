// 🔧 File: frontend/src/tools/text-paragraph-counter/index.jsx
// 🔗 NeoPanze — Paragraph Counter

import React from 'react';

function ResultView({ result }) {
  if (!result) return null;

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='grid grid-cols-1 sm:grid-cols-4 gap-3'>
        <div className='bg-indigo-50 text-indigo-700 rounded-xl p-4 text-center'>
          <p className='text-xs uppercase font-semibold'>Paragrafi</p>
          <p className='text-2xl font-bold mt-1'>{result.paragraphs}</p>
        </div>
        <div className='bg-emerald-50 text-emerald-700 rounded-xl p-4 text-center'>
          <p className='text-xs uppercase font-semibold'>Parole totali</p>
          <p className='text-2xl font-bold mt-1'>{result.totalWords}</p>
        </div>
        <div className='bg-slate-100 text-slate-700 rounded-xl p-4 text-center'>
          <p className='text-xs uppercase font-semibold'>Media parole</p>
          <p className='text-2xl font-bold mt-1'>{result.averageWords}</p>
        </div>
        <div className='bg-slate-100 text-slate-700 rounded-xl p-4 text-center'>
          <p className='text-xs uppercase font-semibold'>Media caratteri</p>
          <p className='text-2xl font-bold mt-1'>{result.averageCharacters}</p>
        </div>
      </div>
      <div className='rounded-xl border border-slate-200 divide-y bg-white'>
        {result.details.map((item) => (
          <div key={item.index} className='px-4 py-3'>
            <div className='flex flex-wrap items-center justify-between gap-2'>
              <span className='text-sm font-semibold text-slate-700'>#{item.index}</span>
              <span className='text-xs text-slate-400'>
                {item.words} parole • {item.characters} caratteri
              </span>
            </div>
            <p className='mt-2 text-slate-600 whitespace-pre-wrap'>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const definition = {
  id: 'text-paragraph-counter',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo',
      placeholder: 'Inserisci il testo con paragrafi separati da righe vuote…',
      rows: 12,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Analizza paragrafi',
};

export default definition;


