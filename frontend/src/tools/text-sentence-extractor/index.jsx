// 🔧 File: frontend/src/tools/text-sentence-extractor/index.jsx
// 🔗 NeoPanze — Sentence Extractor

import React from 'react';

function ResultView({ result }) {
  if (!result) return null;

  return (
    <div className='space-y-3 text-sm text-slate-600'>
      <p className='text-xs uppercase text-slate-400'>Frasi individuate: {result.total}</p>
      <div className='rounded-xl border border-slate-200 divide-y bg-white'>
        {result.sentences.map((item) => (
          <div key={item.index} className='px-4 py-3'>
            <div className='flex flex-wrap items-center justify-between gap-2'>
              <span className='font-semibold text-slate-700'>#{item.index}</span>
              <span className='text-xs text-slate-400'>
                Posizione: {item.start}–{item.end} • Lunghezza: {item.length}
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
  id: 'text-sentence-extractor',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo',
      placeholder: 'Inserisci testo per estrarre frasi con dettagli…',
      rows: 12,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Estrai frasi',
};

export default definition;


