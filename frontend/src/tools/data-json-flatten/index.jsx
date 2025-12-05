// 🔧 File: frontend/src/tools/data-json-flatten/index.jsx
// 🔗 NeoPanze — JSON Flatten

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.flattened) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.flattened);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          Chiavi appiattite: <span className='font-semibold'>{result.keyCount}</span> • 
          Delimitatore: <span className='font-mono'>{result.delimiter}</span>
        </p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia JSON'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96'>
        {result.flattened}
      </pre>
    </div>
  );
}

const definition = {
  id: 'data-json-flatten',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'JSON da appiattire',
      placeholder: '{"user": {"name": "Alice", "age": 25}}',
      rows: 10,
      required: true,
    },
    {
      type: 'text',
      name: 'delimiter',
      label: 'Delimitatore',
      defaultValue: '.',
      helperText: 'Carattere per separare i livelli annidati',
    },
    {
      type: 'text',
      name: 'maxDepth',
      label: 'Profondità massima (opzionale)',
      placeholder: '5',
      helperText: 'Limita la profondità di appiattimento',
    },
  ],
  ResultView,
  ctaLabel: 'Appiattisci JSON',
};

export default definition;


