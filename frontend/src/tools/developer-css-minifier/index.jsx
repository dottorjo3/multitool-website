// 🔧 File: frontend/src/tools/developer-css-minifier/index.jsx
// 🔗 NeoPanze — CSS Minifier

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
          {copied ? 'Copiato!' : 'Copia CSS'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96'>
        {result.minified}
      </pre>
    </div>
  );
}

const definition = {
  id: 'developer-css-minifier',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Codice CSS',
      placeholder: '.class { color: red; }',
      rows: 10,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Minifica CSS',
};

export default definition;


