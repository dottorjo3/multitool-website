// 🔧 File: frontend/src/tools/developer-svg-optimizer/index.jsx
// 🔗 NeoPanze — SVG Optimizer

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.optimized) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.optimized);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          Compressione: {result.compressionRatio} • Lunghezza: {result.optimizedLength} caratteri
        </p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia SVG'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96'>
        {result.optimized}
      </pre>
    </div>
  );
}

const definition = {
  id: 'developer-svg-optimizer',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Codice SVG',
      placeholder: '<svg>...</svg>',
      rows: 10,
      required: true,
    },
    {
      type: 'checkbox',
      name: 'removeComments',
      label: 'Rimuovi commenti',
      defaultValue: 'true',
    },
    {
      type: 'checkbox',
      name: 'removeMetadata',
      label: 'Rimuovi metadati',
      defaultValue: 'true',
    },
  ],
  ResultView,
  ctaLabel: 'Ottimizza SVG',
};

export default definition;


