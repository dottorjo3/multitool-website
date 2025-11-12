// 🔧 File: frontend/src/tools/ai-writer/index.jsx
// 🔗 NeoPanze — Generatore di contenuti assistito da AI (mock-ready)

import React from 'react';

function ResultView({ result }) {
  if (!result?.text) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <div className='text-sm text-slate-600'>
        <p>Modello: {result.model}</p>
        <p>Tono: {result.tone}</p>
        <p>Temperatura: {result.temperature}</p>
      </div>
      {result.warnings?.length > 0 && (
        <div className='p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm'>
          {result.warnings.map((warning) => (
            <p key={warning}>{warning}</p>
          ))}
        </div>
      )}
      <article className='prose prose-slate max-w-none bg-white border border-slate-200 rounded-xl p-6 shadow-sm'>
        {result.text.split('\n').map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </article>
    </div>
  );
}

const definition = {
  id: 'ai-writer',
  fields: [
    {
      type: 'text',
      name: 'topic',
      label: 'Tema principale',
      placeholder: 'Es. Strategie di marketing per startup SaaS',
      required: true,
    },
    {
      type: 'select',
      name: 'tone',
      label: 'Tono desiderato',
      defaultValue: 'balanced',
      options: [
        { value: 'balanced', label: 'Bilanciato' },
        { value: 'friendly', label: 'Amichevole' },
        { value: 'professional', label: 'Professionale' },
        { value: 'persuasive', label: 'Persuasivo' },
      ],
    },
    {
      type: 'number',
      name: 'temperature',
      label: 'Creatività (0-1)',
      defaultValue: 0.7,
      min: 0,
      max: 1,
      step: 0.1,
      helperText: '0 = deterministico, 1 = creativo. Valori intermedi consigliati.',
    },
  ],
  ResultView,
  ctaLabel: 'Genera articolo',
};

export default definition;

