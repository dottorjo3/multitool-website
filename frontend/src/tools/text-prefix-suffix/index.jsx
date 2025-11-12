// 🔧 File: frontend/src/tools/text-prefix-suffix/index.jsx
// 🔗 NeoPanze — Aggiungi prefissi/suffissi a ogni riga di testo

import React from 'react';

function ResultView({ result }) {
  if (!result?.output) {
    return null;
  }

  const { stats } = result;

  return (
    <div className='space-y-4'>
      <div className='text-sm text-slate-600 grid grid-cols-2 gap-2'>
        <span>Linee originali: {stats.originalLines}</span>
        <span>Lunghezza prefisso: {stats.prefixLength}</span>
        <span>Lunghezza suffisso: {stats.suffixLength}</span>
        <span>Salta righe vuote: {stats.skipEmpty ? 'Sì' : 'No'}</span>
      </div>
      <div>
        <label className='block text-sm font-medium text-slate-500 mb-2'>Testo modificato</label>
        <textarea
          className='w-full bg-slate-900 text-slate-100 rounded-lg p-4 text-sm min-h-[220px]'
          readOnly
          value={result.output}
        />
      </div>
    </div>
  );
}

const definition = {
  id: 'text-prefix-suffix',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo originale',
      placeholder: 'Inserisci una riga per ogni voce da modificare',
      rows: 10,
      required: true,
    },
    {
      type: 'text',
      name: 'prefix',
      label: 'Prefisso',
      placeholder: '[*]',
      helperText: 'Sarà aggiunto all’inizio di ogni riga',
      defaultValue: '',
    },
    {
      type: 'text',
      name: 'suffix',
      label: 'Suffisso',
      placeholder: '(fine)',
      helperText: 'Sarà aggiunto alla fine di ogni riga',
      defaultValue: '',
    },
    {
      type: 'checkbox',
      name: 'skipEmpty',
      label: 'Non applicare a righe vuote',
      helperText: 'Evita di aggiungere prefisso/suffisso alle righe senza contenuto',
      defaultValue: 'true',
    },
  ],
  ResultView,
  ctaLabel: 'Applica prefisso/suffisso',
};

export default definition;

