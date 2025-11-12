// 🔧 File: frontend/src/tools/text-vowel-consonant/index.jsx
// 🔗 NeoPanze — Vowels vs Consonants Analyzer

import React from 'react';

function StatCard({ label, count, percentage, color }) {
  return (
    <div className={`${color} rounded-xl p-4 text-center`}>
      <p className='text-xs uppercase font-semibold'>{label}</p>
      <p className='text-xl font-bold mt-1'>{count}</p>
      <p className='text-xs text-white/80 mt-1'>{percentage}%</p>
    </div>
  );
}

function ResultView({ result }) {
  if (!result) return null;

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <p className='text-xs uppercase text-slate-400'>Caratteri totali: {result.totalCharacters}</p>
      <div className='grid grid-cols-2 sm:grid-cols-5 gap-3'>
        <StatCard label='Vocali' count={result.vowels.count} percentage={result.vowels.percentage} color='bg-emerald-500 text-white' />
        <StatCard label='Consonanti' count={result.consonants.count} percentage={result.consonants.percentage} color='bg-indigo-500 text-white' />
        <StatCard label='Cifre' count={result.digits.count} percentage={result.digits.percentage} color='bg-sky-500 text-white' />
        <StatCard label='Spazi' count={result.whitespace.count} percentage={result.whitespace.percentage} color='bg-slate-500 text-white' />
        <StatCard label='Simboli' count={result.symbols.count} percentage={result.symbols.percentage} color='bg-amber-500 text-white' />
      </div>
    </div>
  );
}

const definition = {
  id: 'text-vowel-consonant',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo',
      placeholder: 'Inserisci testo per contare vocali, consonanti e simboli…',
      rows: 10,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Conta caratteri',
};

export default definition;


