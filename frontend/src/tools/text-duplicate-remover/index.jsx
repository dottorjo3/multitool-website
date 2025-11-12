// 🔧 File: frontend/src/tools/text-duplicate-remover/index.jsx
// 🔗 Farm Ready — UI rimozione duplicati

import React from 'react';

function ResultView({ result }) {
  if (!result?.output) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>
        Lunghezza originale: {result.originalLength} • Dopo pulizia: {result.outputLength}
      </p>
      <textarea
        readOnly
        value={result.output}
        className='w-full h-48 bg-slate-900 text-slate-100 rounded-lg p-3 text-sm'
      />
    </div>
  );
}

const definition = {
  id: 'text-duplicate-remover',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo da ripulire',
      rows: 10,
      required: true,
    },
    {
      type: 'select',
      name: 'mode',
      label: 'Modalità',
      defaultValue: 'lines',
      options: [
        { value: 'lines', label: 'Righe duplicate' },
        { value: 'words', label: 'Parole duplicate' },
      ],
    },
    {
      type: 'checkbox',
      name: 'caseSensitive',
      label: 'Case sensitive',
      helperText: 'Mantiene duplicati con maiuscole diverse',
      defaultValue: 'false',
    },
  ],
  ResultView,
  ctaLabel: 'Rimuovi duplicati',
};

export default definition;


