// 🔧 File: frontend/src/tools/data-csv-normalize/index.jsx
// 🔗 NeoPanze — CSV Normalize

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.normalized) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.normalized);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          Righe originali: {result.originalRows} • Righe normalizzate: {result.normalizedRows} • 
          Righe rimosse: <span className='text-red-600 font-semibold'>{result.rowsRemoved}</span>
        </p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia CSV'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96'>
        {result.normalized}
      </pre>
    </div>
  );
}

const definition = {
  id: 'data-csv-normalize',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'CSV da normalizzare',
      placeholder: 'name, age\nAlice,25\nBob,30\n\n',
      rows: 10,
      required: true,
    },
    {
      type: 'text',
      name: 'delimiter',
      label: 'Delimitatore',
      defaultValue: ',',
    },
    {
      type: 'checkbox',
      name: 'removeEmptyRows',
      label: 'Rimuovi righe vuote',
      defaultValue: 'true',
    },
    {
      type: 'checkbox',
      name: 'trimCells',
      label: 'Trim celle',
      defaultValue: 'true',
      helperText: 'Rimuove spazi bianchi da inizio e fine di ogni cella',
    },
  ],
  ResultView,
  ctaLabel: 'Normalizza CSV',
};

export default definition;


