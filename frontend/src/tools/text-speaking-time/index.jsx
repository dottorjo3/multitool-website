// 🔧 File: frontend/src/tools/text-speaking-time/index.jsx
// 🔗 NeoPanze — Tempo presentazione orale

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
        <div className='bg-rose-50 text-rose-700 p-4 rounded-xl'>
          <p className='text-sm font-semibold'>Parole</p>
          <p className='text-2xl font-bold mt-1'>{result.words}</p>
        </div>
        <div className='bg-violet-50 text-violet-700 p-4 rounded-xl'>
          <p className='text-sm font-semibold'>Tempo stimato</p>
          <p className='text-2xl font-bold mt-1'>{result.formatted}</p>
          <p className='text-xs mt-2 opacity-80'>({result.seconds} secondi)</p>
        </div>
        <div className='bg-slate-100 text-slate-700 p-4 rounded-xl'>
          <p className='text-sm font-semibold'>Velocità</p>
          <p className='text-2xl font-bold mt-1'>{result.wordsPerMinute} wpm</p>
        </div>
      </div>
      <p className='text-sm text-slate-600'>
        Tempo esatto: {result.minutesExact} minuti • Arrotondato: {result.minutesRounded} min
      </p>
    </div>
  );
}

const definition = {
  id: 'text-speaking-time',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo da presentare',
      placeholder: 'Incolla il discorso o la presentazione...',
      rows: 10,
      required: true,
    },
    {
      type: 'number',
      name: 'wordsPerMinute',
      label: 'Parole al minuto (voce)',
      defaultValue: 130,
      min: 60,
      max: 250,
    },
  ],
  ResultView,
  ctaLabel: 'Calcola tempo di esposizione',
};

export default definition;


