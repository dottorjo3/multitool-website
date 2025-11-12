// 🔧 File: frontend/src/tools/text-line-number/index.jsx
// 🔗 NeoPanze — Numerazione automatica delle righe

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
        <span>Inizio numerazione: {stats.numberingStart}</span>
        <span>Pad width: {stats.padWidth}</span>
        <span>Separatore: {stats.separator || 'Nessuno'}</span>
        <span>Salta righe vuote: {stats.removeEmpty ? 'Sì' : 'No'}</span>
      </div>
      <div>
        <label className='block text-sm font-medium text-slate-500 mb-2'>Testo numerato</label>
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
  id: 'text-line-number',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da numerare',
      placeholder: 'Inserisci una riga per ogni elemento',
      rows: 10,
      required: true,
    },
    {
      type: 'number',
      name: 'start',
      label: 'Numero iniziale',
      defaultValue: 1,
      helperText: 'Valore con cui parte la numerazione',
    },
    {
      type: 'number',
      name: 'padWidth',
      label: 'Lunghezza numerazione (padding)',
      defaultValue: 2,
      min: 0,
      max: 10,
      helperText: 'Numero di cifre (es. 3 → 001, 002, 003)',
    },
    {
      type: 'text',
      name: 'separator',
      label: 'Separatore',
      defaultValue: '. ',
      helperText: 'Stringa tra numero e contenuto',
    },
    {
      type: 'checkbox',
      name: 'removeEmpty',
      label: 'Non numerare righe vuote',
      defaultValue: 'false',
    },
  ],
  ResultView,
  ctaLabel: 'Numerazione righe',
};

export default definition;

