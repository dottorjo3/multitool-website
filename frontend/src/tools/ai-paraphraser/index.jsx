// 🔧 File: frontend/src/tools/ai-paraphraser/index.jsx
// 🔗 NeoPanze — Parafrasi AI mock-ready

import React from 'react';

function ResultView({ result }) {
  if (!result?.text) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <div className='text-sm text-slate-600'>
        <p>Tono: {result.tone}</p>
        <p>Lingua: {result.language}</p>
        <p>Temperatura: {result.temperature}</p>
        <p>Modello: {result.model}</p>
      </div>
      {result.warnings?.length > 0 && (
        <div className='p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm'>
          {result.warnings.map((warning) => (
            <p key={warning}>{warning}</p>
          ))}
        </div>
      )}
      <div className='bg-slate-900 text-slate-100 rounded-xl p-5 text-sm leading-relaxed whitespace-pre-wrap'>
        {result.text}
      </div>
    </div>
  );
}

const definition = {
  id: 'ai-paraphraser',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo originale',
      placeholder: 'Incolla la frase o il paragrafo da parafrasare...',
      rows: 10,
      required: true,
    },
    {
      type: 'select',
      name: 'tone',
      label: 'Tono desiderato',
      defaultValue: 'neutral',
      options: [
        { value: 'neutral', label: 'Neutrale' },
        { value: 'friendly', label: 'Amichevole' },
        { value: 'professional', label: 'Professionale' },
      ],
    },
    {
      type: 'text',
      name: 'language',
      label: 'Lingua (codice ISO)',
      defaultValue: 'it',
      helperText: 'Esempi: it, en, es, fr',
    },
    {
      type: 'number',
      name: 'temperature',
      label: 'Creatività (0-1)',
      defaultValue: 0.4,
      min: 0,
      max: 1,
      step: 0.1,
    },
  ],
  ResultView,
  ctaLabel: 'Parafrasa testo',
};

export default definition;

