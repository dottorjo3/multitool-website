// 🔧 File: frontend/src/tools/json-formatter/index.jsx
// 🔗 Farm Ready — UI formatter JSON con opzioni spazi/minify

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.output) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          Spazi: {result.spaces} • Minify: {result.minify ? 'Sì' : 'No'} • Dimensione: {result.sizeBytes} byte
        </p>
        <button
          type='button'
          onClick={handleCopy}
          className='px-3 py-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition'
        >
          {copied ? 'Copiato!' : 'Copia'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-100 rounded-lg p-4 text-sm overflow-auto max-h-80'>
        {result.output}
      </pre>
    </div>
  );
}

const definition = {
  id: 'json-formatter',
  fields: [
    {
      type: 'textarea',
      name: 'json',
      label: 'JSON da formattare',
      placeholder: '{ "hello": "world" }',
      rows: 10,
      required: true,
    },
    {
      type: 'number',
      name: 'spaces',
      label: 'Numero di spazi per indentazione',
      defaultValue: 2,
      min: 0,
      max: 16,
      helperText: 'Usa 0 per minify (equivale a JSON compatto)',
    },
    {
      type: 'checkbox',
      name: 'minify',
      label: 'Compatta output',
      helperText: 'Ignora indentazione e produce una singola linea',
      defaultValue: 'false',
    },
  ],
  ResultView,
  ctaLabel: 'Formatta JSON',
};

export default definition;


