// 🔧 File: frontend/src/tools/text-trim-lines/index.jsx
// 🔗 NeoPanze — Trim Lines

import React from 'react';

function ResultView({ result }) {
  if (!result) return null;

  return (
    <div className='space-y-3 text-sm text-slate-600'>
      <p className='text-xs uppercase text-slate-400'>
        Righe originali: {result.originalLineCount} • Righe finali: {result.trimmedLineCount}
      </p>
      <textarea
        readOnly
        className='w-full rounded-xl border border-slate-200 bg-slate-900 text-slate-50 font-mono text-xs p-4'
        rows={result.trimmedLineCount < 12 ? result.trimmedLineCount + 2 : 12}
        value={result.result}
      />
    </div>
  );
}

const definition = {
  id: 'text-trim-lines',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo',
      placeholder: 'Ogni riga verrà ripulita dagli spazi iniziali e finali…',
      rows: 10,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Ripulisci righe',
};

export default definition;


