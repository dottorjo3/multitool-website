// 🔧 File: frontend/src/tools/text-strict-json-pretty/index.jsx
// 🔗 NeoPanze — Strict JSON Pretty

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>JSON formattato:</p>
        <div className='bg-slate-900 text-slate-50 p-4 rounded border border-indigo-200 overflow-x-auto'>
          <pre className='font-mono text-xs whitespace-pre-wrap break-words'>
            {result.formatted}
          </pre>
        </div>
        <div className='mt-3 flex gap-4 text-xs text-indigo-700'>
          <span>Indentazione: <span className='font-semibold'>{result.indent} spazi</span></span>
          <span>Lunghezza: <span className='font-semibold'>{result.length} caratteri</span></span>
          {result.isValid && (
            <span className='text-green-600 font-semibold'>✓ JSON valido</span>
          )}
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-strict-json-pretty',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'JSON da formattare',
      placeholder: 'Inserisci il JSON da formattare...',
      rows: 10,
      required: true,
    },
    {
      type: 'text',
      name: 'indent',
      label: 'Indentazione (0-10)',
      placeholder: '2',
      defaultValue: '2',
    },
  ],
  ResultView,
  ctaLabel: 'Formatta JSON',
};

export default definition;

