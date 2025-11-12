// 🔧 File: frontend/src/tools/csv-to-json/index.jsx
// 🔗 Farm Ready — UI conversione CSV → JSON

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
      <p className='text-sm text-slate-600'>
        Righe: {result.rows} • Colonne: {result.columns}
      </p>
      <div className='flex justify-end'>
        <button
          type='button'
          onClick={handleCopy}
          className='px-3 py-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition'
        >
          {copied ? 'Copiato!' : 'Copia JSON'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-100 rounded-lg p-4 text-sm overflow-auto max-h-80'>
        {result.json}
      </pre>
    </div>
  );
}

const definition = {
  id: 'csv-to-json',
  fields: [
    {
      type: 'textarea',
      name: 'csv',
      label: 'CSV di origine',
      placeholder: 'name,email\nAlice,alice@example.com',
      rows: 10,
      required: true,
    },
    {
      type: 'text',
      name: 'delimiter',
      label: 'Delimitatore',
      defaultValue: ',',
      helperText: 'Usa ; per CSV esportati da Excel europeo',
    },
    {
      type: 'checkbox',
      name: 'pretty',
      label: 'Formato leggibile',
      helperText: 'Mantiene indentazione nel JSON',
      defaultValue: 'true',
    },
  ],
  ResultView,
  ctaLabel: 'Converti in JSON',
};

export default definition;


