// 🔧 File: frontend/src/tools/data-excel-to-json/index.jsx
// 🔗 NeoPanze — Excel to JSON

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.json) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='p-3 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='text-sm text-indigo-900'>
          File: <span className='font-semibold'>{result.fileName}</span> • 
          Foglio: <span className='font-semibold'>{result.sheetName}</span>
        </p>
        <p className='text-sm text-indigo-700'>
          Righe: {result.rows} • Colonne: {result.columns}
        </p>
        {result.availableSheets && result.availableSheets.length > 1 && (
          <p className='text-xs text-indigo-600 mt-1'>
            Fogli disponibili: {result.availableSheets.join(', ')}
          </p>
        )}
      </div>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>JSON convertito</p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia JSON'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96'>
        {result.json}
      </pre>
    </div>
  );
}

const definition = {
  id: 'data-excel-to-json',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'File Excel',
      accept: '.xlsx,.xls',
      required: true,
      helperText: 'Carica un file Excel (.xlsx o .xls)',
    },
    {
      type: 'text',
      name: 'sheetName',
      label: 'Nome foglio (opzionale)',
      placeholder: 'Sheet1',
      helperText: 'Lascia vuoto per usare il primo foglio',
    },
    {
      type: 'checkbox',
      name: 'raw',
      label: 'Valori raw',
      defaultValue: 'false',
      helperText: 'Mantiene i valori originali invece di formattarli',
    },
  ],
  ResultView,
  ctaLabel: 'Converti a JSON',
};

export default definition;


