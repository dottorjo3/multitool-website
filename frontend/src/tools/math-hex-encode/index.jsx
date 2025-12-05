// 🔧 File: frontend/src/tools/math-hex-encode/index.jsx
// 🔗 NeoPanze — Hex Encode (duplicato per Math category)

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.encoded) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.encoded);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          Originale: {result.originalLength} caratteri → Hex: {result.encodedLength} caratteri
        </p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia Hex'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96 break-all'>
        {result.encoded}
      </pre>
    </div>
  );
}

const definition = {
  id: 'math-hex-encode',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo da codificare',
      placeholder: 'Inserisci del testo...',
      rows: 8,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Codifica in Hex',
};

export default definition;


