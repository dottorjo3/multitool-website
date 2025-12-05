// 🔧 File: frontend/src/tools/text-leet-speak/index.jsx
// 🔗 NeoPanze — Leet Speak

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>
          {result.mode === 'encode' ? 'Testo in Leet Speak:' : 'Testo decodificato:'}
        </p>
        <div className='bg-white p-4 rounded border border-indigo-200'>
          <p className='font-mono text-slate-900 whitespace-pre-wrap break-words'>
            {result.mode === 'encode' ? result.encoded : result.decoded}
          </p>
        </div>
        {result.mode === 'encode' && result.level && (
          <p className='mt-2 text-xs text-indigo-700'>
            Livello: <span className='font-semibold'>{result.level}</span>
          </p>
        )}
      </div>
    </div>
  );
}

const definition = {
  id: 'text-leet-speak',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da convertire',
      placeholder: 'Inserisci il testo da convertire in leet speak...',
      rows: 8,
      required: true,
    },
    {
      type: 'select',
      name: 'mode',
      label: 'Modalità',
      options: [
        { value: 'encode', label: 'Codifica (Text → Leet)' },
        { value: 'decode', label: 'Decodifica (Leet → Text)' },
      ],
      defaultValue: 'encode',
    },
    {
      type: 'select',
      name: 'level',
      label: 'Livello (solo per codifica)',
      options: [
        { value: 'low', label: 'Basso (30%)' },
        { value: 'medium', label: 'Medio (50%)' },
        { value: 'high', label: 'Alto (70%)' },
        { value: 'extreme', label: 'Estremo (90%)' },
      ],
      defaultValue: 'medium',
    },
  ],
  ResultView,
  ctaLabel: 'Converti',
};

export default definition;

