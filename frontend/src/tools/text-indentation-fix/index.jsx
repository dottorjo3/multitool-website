// 🔧 File: frontend/src/tools/text-indentation-fix/index.jsx
// 🔗 NeoPanze — Indentation Fix

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>Testo con indentazione normalizzata:</p>
        <div className='bg-white p-4 rounded border border-indigo-200'>
          <pre className='text-slate-900 whitespace-pre-wrap break-words font-mono text-xs'>
            {result.fixed}
          </pre>
        </div>
        <div className='mt-3 text-xs text-indigo-700'>
          <p>Tipo: <span className='font-semibold'>{result.indentType === 'tabs' ? 'Tab' : 'Spazi'}</span></p>
          {result.indentType === 'spaces' && (
            <p>Dimensione: <span className='font-semibold'>{result.indentSize} spazi</span></p>
          )}
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-indentation-fix',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da correggere',
      placeholder: 'Inserisci il testo con indentazione da normalizzare...',
      rows: 10,
      required: true,
    },
    {
      type: 'select',
      name: 'indentType',
      label: 'Tipo di indentazione',
      options: [
        { value: 'spaces', label: 'Spazi' },
        { value: 'tabs', label: 'Tab' },
      ],
      defaultValue: 'spaces',
    },
    {
      type: 'text',
      name: 'indentSize',
      label: 'Dimensione indentazione (solo per spazi)',
      placeholder: '2',
      defaultValue: '2',
    },
  ],
  ResultView,
  ctaLabel: 'Correggi indentazione',
};

export default definition;

