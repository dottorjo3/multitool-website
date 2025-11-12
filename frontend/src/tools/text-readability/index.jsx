// 🔧 File: frontend/src/tools/text-readability/index.jsx
// 🔗 NeoPanze — Readability Analyzer

import React from 'react';

function ScoreBadge({ label, value }) {
  return (
    <div className='bg-slate-100 rounded-lg p-3 text-sm'>
      <p className='font-semibold text-slate-600'>{label}</p>
      <p className='mt-1 text-xl font-bold text-indigo-600'>{value}</p>
    </div>
  );
}

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
        <ScoreBadge label='Frasi' value={result.sentences} />
        <ScoreBadge label='Parole' value={result.words} />
        <ScoreBadge label='Sillabe' value={result.syllables} />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <ScoreBadge label='Parole per frase' value={result.averages.wordsPerSentence} />
        <ScoreBadge label='Sillabe per parola' value={result.averages.syllablesPerWord} />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <div className='bg-emerald-50 text-emerald-700 p-4 rounded-xl'>
          <p className='text-sm font-semibold'>Flesch Reading Ease</p>
          <p className='text-2xl font-bold mt-2'>{result.scores.fleschReadingEase}</p>
          <p className='text-xs mt-2 opacity-80'>Più alto = più facile da leggere</p>
        </div>
        <div className='bg-indigo-50 text-indigo-700 p-4 rounded-xl'>
          <p className='text-sm font-semibold'>Flesch-Kincaid Grade</p>
          <p className='text-2xl font-bold mt-2'>{result.scores.fleschKincaidGrade}</p>
          <p className='text-xs mt-2 opacity-80'>Classe scolastica USA equivalente</p>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-readability',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo da analizzare',
      placeholder: 'Incolla un testo di almeno alcune frasi...',
      rows: 12,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Analizza leggibilità',
};

export default definition;


