// 🔧 File: frontend/src/tools/text-sorter/index.jsx
// 🔗 NeoPanze — Tool per ordinare righe di testo

import React from 'react';

function ResultView({ result }) {
  if (!result?.output) {
    return null;
  }

  const { stats } = result;

  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-2 gap-2 text-sm text-slate-600'>
        <span>Linee originali: {stats.originalLines}</span>
        <span>Linee ordinate: {stats.processedLines}</span>
        <span>Ordinamento: {stats.order === 'asc' ? 'Crescente' : 'Decrescente'}</span>
        <span>Case sensitive: {stats.caseSensitive ? 'Sì' : 'No'}</span>
        <span>Solo valori unici: {stats.uniqueApplied ? 'Sì' : 'No'}</span>
        <span>Righe vuote rimosse: {stats.removeEmpty ? 'Sì' : 'No'}</span>
      </div>
      <div>
        <label className='block text-sm font-medium text-slate-500 mb-2'>Testo ordinato</label>
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
  id: 'text-sorter',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da ordinare',
      placeholder: 'Inserisci una riga per ogni voce da ordinare',
      rows: 10,
      required: true,
    },
    {
      type: 'select',
      name: 'order',
      label: 'Ordinamento',
      defaultValue: 'asc',
      options: [
        { value: 'asc', label: 'Crescente (A-Z)' },
        { value: 'desc', label: 'Decrescente (Z-A)' },
      ],
    },
    {
      type: 'checkbox',
      name: 'caseSensitive',
      label: 'Case sensitive',
      helperText: 'Mantiene la distinzione tra maiuscole e minuscole',
      defaultValue: 'false',
    },
    {
      type: 'checkbox',
      name: 'unique',
      label: 'Mantieni solo righe uniche',
      helperText: 'Rimuove i duplicati prima dell\'ordinamento',
      defaultValue: 'false',
    },
    {
      type: 'checkbox',
      name: 'removeEmpty',
      label: 'Rimuovi righe vuote',
      helperText: 'Elimina le righe vuote prima dell\'ordinamento',
      defaultValue: 'true',
    },
  ],
  ResultView,
  ctaLabel: 'Ordina testo',
};

export default definition;

