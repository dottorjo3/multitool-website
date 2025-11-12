// 🔧 File: frontend/src/tools/ai-summarizer/index.jsx
// 🔗 NeoPanze — Riassuntore AI mock-ready

import React from 'react';

function ResultView({ result }) {
  if (!result?.summary) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <div className='text-sm text-slate-600'>
        <p>Lunghezza: {result.length}</p>
        {result.focus && <p>Focus: {result.focus}</p>}
        <p>Caratteri originali: {result.originalCharacters}</p>
        <p>Modello: {result.model}</p>
      </div>
      {result.warnings?.length > 0 && (
        <div className='p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm'>
          {result.warnings.map((warning) => (
            <p key={warning}>{warning}</p>
          ))}
        </div>
      )}
      <div className='bg-slate-900 text-slate-100 rounded-xl p-5 text-sm leading-relaxed'>
        {result.summary}
      </div>
    </div>
  );
}

const definition = {
  id: 'ai-summarizer',
  fields: [
    {
      type: 'textarea',
      name: 'content',
      label: 'Testo da riassumere',
      placeholder: 'Incolla qui un documento, un articolo o note lunghe...',
      rows: 12,
      required: true,
    },
    {
      type: 'select',
      name: 'length',
      label: 'Lunghezza desiderata',
      defaultValue: 'medium',
      options: [
        { value: 'short', label: 'Corto (1-2 frasi)' },
        { value: 'medium', label: 'Medio' },
        { value: 'long', label: 'Dettagliato' },
      ],
    },
    {
      type: 'text',
      name: 'focus',
      label: 'Focus opzionale',
      placeholder: 'Es. Highlight KPI, cita vantaggi principali...',
      helperText: 'Specifica un punto d’attenzione per la sintesi',
    },
  ],
  ResultView,
  ctaLabel: 'Genera riassunto',
};

export default definition;

