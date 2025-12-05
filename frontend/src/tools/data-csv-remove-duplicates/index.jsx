// 🔧 File: frontend/src/tools/data-csv-remove-duplicates/index.jsx
// 🔗 NeoPanze — CSV Remove Duplicates

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.cleaned) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.cleaned);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          Righe originali: {result.originalRows} • Righe uniche: {result.uniqueRows} • 
          Duplicati rimossi: <span className='text-red-600 font-semibold'>{result.duplicatesRemoved}</span>
        </p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia CSV'}
        </button>
      </div>
      {result.duplicatesRemoved > 0 && (
        <div className='p-3 bg-amber-50 border border-amber-200 rounded-lg'>
          <p className='text-xs font-semibold text-amber-800 mb-1'>Duplicati trovati:</p>
          {result.duplicates.slice(0, 5).map((dup, idx) => (
            <p key={idx} className='text-xs text-amber-700'>Riga {dup.row}</p>
          ))}
          {result.duplicates.length > 5 && (
            <p className='text-xs text-amber-600'>... e altri {result.duplicates.length - 5}</p>
          )}
        </div>
      )}
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96'>
        {result.cleaned}
      </pre>
    </div>
  );
}

const definition = {
  id: 'data-csv-remove-duplicates',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'CSV da pulire',
      placeholder: 'name,age\nAlice,25\nBob,30\nAlice,25',
      rows: 10,
      required: true,
    },
    {
      type: 'text',
      name: 'column',
      label: 'Colonna per verifica duplicati (opzionale)',
      placeholder: 'Lasciare vuoto per verifica su tutte le colonne',
      helperText: 'Se specificata, considera duplicati solo per questa colonna',
    },
    {
      type: 'text',
      name: 'delimiter',
      label: 'Delimitatore',
      defaultValue: ',',
    },
  ],
  ResultView,
  ctaLabel: 'Rimuovi Duplicati',
};

export default definition;


