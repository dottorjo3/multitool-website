// 🔧 File: frontend/src/tools/text-cleaner/index.jsx
// 🔗 NeoPanze — Tool per pulizia testo (trim, spazi, righe vuote)

import React from 'react';

function ResultView({ result }) {
  if (!result?.output) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-2 gap-2 text-sm text-slate-600'>
        <span>Caratteri originali: {result.stats.originalLength}</span>
        <span>Caratteri finali: {result.stats.cleanedLength}</span>
        <span>Caratteri rimossi: {result.stats.charactersRemoved}</span>
        <span>Linee originali: {result.stats.originalLines}</span>
        <span>Linee finali: {result.stats.cleanedLines}</span>
      </div>
      <div>
        <label className='block text-sm font-medium text-slate-500 mb-2'>Testo pulito</label>
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
  id: 'text-cleaner',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo originale',
      placeholder: 'Incolla qui il testo da pulire...',
      rows: 10,
      required: true,
    },
    {
      type: 'checkbox',
      name: 'trimLines',
      label: 'Rimuovi spazi iniziali/finali da ogni riga',
      helperText: 'Elimina lo spazio a inizio e fine riga (default: attivo)',
      defaultValue: 'true',
    },
    {
      type: 'checkbox',
      name: 'collapseSpaces',
      label: 'Comprimi spazi multipli in uno solo',
      helperText: 'Sostituisce sequenze di spazi/tab con un singolo spazio',
      defaultValue: 'true',
    },
    {
      type: 'checkbox',
      name: 'removeEmptyLines',
      label: 'Elimina righe vuote',
      helperText: 'Rimuove tutte le righe vuote dal testo',
      defaultValue: 'false',
    },
  ],
  ResultView,
  ctaLabel: 'Pulisci testo',
};

export default definition;

