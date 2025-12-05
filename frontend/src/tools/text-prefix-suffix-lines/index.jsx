// 🔧 File: frontend/src/tools/text-prefix-suffix-lines/index.jsx
// 🔗 NeoPanze — Prefix/Suffix Lines

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>Testo modificato:</p>
        <div className='bg-white p-4 rounded border border-indigo-200'>
          <pre className='text-slate-900 whitespace-pre-wrap break-words font-mono text-xs'>
            {result.modified}
          </pre>
        </div>
        <div className='mt-3 text-xs text-indigo-700'>
          <p>Righe processate: <span className='font-semibold'>{result.linesProcessed}</span></p>
          {result.prefix && <p>Prefisso: <span className='font-mono'>{result.prefix}</span></p>}
          {result.suffix && <p>Suffisso: <span className='font-mono'>{result.suffix}</span></p>}
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-prefix-suffix-lines',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da modificare',
      placeholder: 'Inserisci il testo a cui aggiungere prefisso/suffisso...',
      rows: 8,
      required: true,
    },
    {
      type: 'text',
      name: 'prefix',
      label: 'Prefisso (opzionale)',
      placeholder: 'Es: - , > , * ...',
    },
    {
      type: 'text',
      name: 'suffix',
      label: 'Suffisso (opzionale)',
      placeholder: 'Es: ; , . ...',
    },
    {
      type: 'checkbox',
      name: 'skipEmpty',
      label: 'Salta righe vuote',
      defaultValue: 'false',
    },
  ],
  ResultView,
  ctaLabel: 'Applica modifiche',
};

export default definition;

