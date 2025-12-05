// 🔧 File: frontend/src/tools/developer-javascript-minifier/index.jsx
// 🔗 NeoPanze — JavaScript Minifier

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.minified) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.minified);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          Compressione: {result.compressionRatio} • Lunghezza: {result.minifiedLength} caratteri
        </p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia JavaScript'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96'>
        {result.minified}
      </pre>
    </div>
  );
}

const definition = {
  id: 'developer-javascript-minifier',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Codice JavaScript',
      placeholder: 'function test() { return "hello"; }',
      rows: 10,
      required: true,
    },
    {
      type: 'checkbox',
      name: 'compress',
      label: 'Compressione avanzata',
      defaultValue: 'true',
    },
    {
      type: 'checkbox',
      name: 'mangle',
      label: 'Mangle variabili',
      defaultValue: 'true',
    },
  ],
  ResultView,
  ctaLabel: 'Minifica JavaScript',
};

export default definition;


