// 🔧 File: frontend/src/tools/developer-random-bytes/index.jsx
// 🔗 NeoPanze — Random Bytes

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
    <div className='space-y-3 text-sm text-slate-600'>
      <p>Lunghezza: {result.length} byte • Encoding: {result.encoding}</p>
      <div className='bg-slate-900 text-slate-50 font-mono text-xs rounded-lg p-4 break-all relative'>
        {result.output}
        <button
          type='button'
          onClick={handleCopy}
          className='absolute top-2 right-2 text-xs font-semibold text-emerald-300 hover:text-emerald-200'
        >
          {copied ? 'Copiato!' : 'Copia'}
        </button>
      </div>
    </div>
  );
}

const definition = {
  id: 'developer-random-bytes',
  fields: [
    {
      type: 'number',
      name: 'length',
      label: 'Numero di byte',
      defaultValue: 32,
      min: 1,
      max: 1024,
    },
    {
      type: 'select',
      name: 'encoding',
      label: 'Encoding',
      defaultValue: 'hex',
      options: [
        { value: 'hex', label: 'Hex' },
        { value: 'base64', label: 'Base64' },
      ],
    },
  ],
  ResultView,
  ctaLabel: 'Genera bytes casuali',
};

export default definition;


