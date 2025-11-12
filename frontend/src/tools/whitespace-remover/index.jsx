// 🔧 File: frontend/src/tools/whitespace-remover/index.jsx
// 🔗 Farm Ready — UI gestione spazi bianchi

import React from 'react';

function ResultView({ result }) {
  if (!result?.output) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>
        Modalità: {result.mode} • Lunghezza iniziale: {result.originalLength} • Finale: {result.outputLength}
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
  id: 'whitespace-remover',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo da pulire',
      rows: 10,
      required: true,
    },
    {
      type: 'select',
      name: 'mode',
      label: 'Modalità',
      defaultValue: 'trim',
      options: [
        { value: 'trim', label: 'Trim (inizio/fine)' },
        { value: 'collapse', label: 'Comprimi spazi consecutivi' },
        { value: 'remove-all', label: 'Rimuovi tutti gli spazi' },
        { value: 'trim-lines', label: 'Trim ogni riga' },
      ],
    },
  ],
  ResultView,
  ctaLabel: 'Pulisci whitespace',
};

export default definition;


