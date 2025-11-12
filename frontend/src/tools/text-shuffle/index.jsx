// 🔧 File: frontend/src/tools/text-shuffle/index.jsx
// 🔗 NeoPanze — Mescola le righe di testo in ordine casuale

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
        <span>Linee dopo filtri: {stats.totalAfterFilters}</span>
        <span>Linee restituite: {stats.processedLines}</span>
        <span>Limite applicato: {stats.limit ? stats.limit : 'Nessuno'}</span>
        <span>Solo unici: {stats.unique ? 'Sì' : 'No'}</span>
        <span>Righe vuote rimosse: {stats.removeEmpty ? 'Sì' : 'No'}</span>
      </div>
      <div>
        <label className='block text-sm font-medium text-slate-500 mb-2'>Output mescolato</label>
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
  id: 'text-shuffle',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da mescolare',
      placeholder: 'Inserisci una riga per ogni voce',
      rows: 10,
      required: true,
    },
    {
      type: 'number',
      name: 'limit',
      label: 'Limite righe restituite',
      placeholder: 'Lascia vuoto per nessun limite',
      min: 0,
      max: 9999,
      helperText: 'Imposta un numero massimo di righe nell’output',
    },
    {
      type: 'checkbox',
      name: 'unique',
      label: 'Mantieni solo righe uniche prima della mescola',
      helperText: 'Rimuove duplicati prima del mescolamento',
      defaultValue: 'false',
    },
    {
      type: 'checkbox',
      name: 'removeEmpty',
      label: 'Rimuovi righe vuote',
      helperText: 'Filtra le righe vuote prima del mescolamento',
      defaultValue: 'true',
    },
  ],
  ResultView,
  ctaLabel: 'Mescola righe',
};

export default definition;

