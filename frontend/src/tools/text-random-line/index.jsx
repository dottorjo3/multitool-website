// 🔧 File: frontend/src/tools/text-random-line/index.jsx
// 🔗 NeoPanze — Estrai righe casuali dal testo

import React from 'react';

function ResultView({ result }) {
  if (!result?.output) {
    return null;
  }

  const { stats } = result;

  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-2 gap-2 text-sm text-slate-600'>
        <span>Righe richieste: {stats.requested}</span>
        <span>Righe restituite: {stats.returned}</span>
        <span>Disponibili dopo filtri: {stats.totalAvailable}</span>
        <span>Solo uniche: {stats.unique ? 'Sì' : 'No'}</span>
        <span>Rimuovi righe vuote: {stats.removeEmpty ? 'Sì' : 'No'}</span>
      </div>
      <div>
        <label className='block text-sm font-medium text-slate-500 mb-2'>Righe estratte</label>
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
  id: 'text-random-line',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo sorgente',
      placeholder: 'Inserisci una riga per ogni elemento (lista, nomi, etc.)',
      rows: 10,
      required: true,
    },
    {
      type: 'number',
      name: 'count',
      label: 'Numero di righe da estrarre',
      defaultValue: 1,
      min: 1,
      max: 999,
    },
    {
      type: 'checkbox',
      name: 'unique',
      label: 'Evita duplicati',
      helperText: 'Applica estrazione senza ripetizioni',
      defaultValue: 'false',
    },
    {
      type: 'checkbox',
      name: 'removeEmpty',
      label: 'Ignora righe vuote',
      defaultValue: 'true',
    },
  ],
  ResultView,
  ctaLabel: 'Estrai righe casuali',
};

export default definition;

