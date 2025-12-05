// 🔧 File: frontend/src/tools/data-json-pick-keys/index.jsx
// 🔗 NeoPanze — JSON Pick Keys

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.picked) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.picked);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          Chiavi selezionate: <span className='font-semibold'>{result.keysPicked.join(', ')}</span>
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
        {result.picked}
      </pre>
    </div>
  );
}

const definition = {
  id: 'data-json-pick-keys',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'JSON da modificare',
      placeholder: '{"name": "Alice", "age": 25, "city": "Rome"}',
      rows: 10,
      required: true,
    },
    {
      type: 'text',
      name: 'keys',
      label: 'Chiavi da mantenere',
      placeholder: 'name,age',
      required: true,
      helperText: 'Separate da virgola',
    },
    {
      type: 'checkbox',
      name: 'recursive',
      label: 'Selezione ricorsiva',
      defaultValue: 'false',
      helperText: 'Mantiene le chiavi anche negli oggetti annidati',
    },
  ],
  ResultView,
  ctaLabel: 'Seleziona Chiavi',
};

export default definition;


