// 🔧 File: frontend/src/tools/data-csv-rename-columns/index.jsx
// 🔗 NeoPanze — CSV Rename Columns

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.modified) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.modified);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          Rinominazioni: {Object.keys(result.mappings || {}).length} • Righe: {result.rows}
        </p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia CSV'}
        </button>
      </div>
      {result.mappings && Object.keys(result.mappings).length > 0 && (
        <div className='p-3 bg-indigo-50 border border-indigo-200 rounded-lg'>
          <p className='text-xs font-semibold text-indigo-900 mb-1'>Mapping applicati:</p>
          {Object.entries(result.mappings).map(([oldName, newName]) => (
            <p key={oldName} className='text-xs text-indigo-700'>
              <span className='font-mono'>{oldName}</span> → <span className='font-mono font-semibold'>{newName}</span>
            </p>
          ))}
        </div>
      )}
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96'>
        {result.modified}
      </pre>
    </div>
  );
}

const definition = {
  id: 'data-csv-rename-columns',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'CSV da modificare',
      placeholder: 'old_name,age\nAlice,25\nBob,30',
      rows: 10,
      required: true,
    },
    {
      type: 'text',
      name: 'mappings',
      label: 'Mapping colonne',
      placeholder: 'old_name:new_name,age:years',
      required: true,
      helperText: 'Formato: vecchia:nuova,vecchia2:nuova2',
    },
    {
      type: 'text',
      name: 'delimiter',
      label: 'Delimitatore',
      defaultValue: ',',
    },
  ],
  ResultView,
  ctaLabel: 'Rinomina Colonne',
};

export default definition;


