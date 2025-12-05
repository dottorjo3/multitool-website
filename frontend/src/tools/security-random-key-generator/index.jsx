// 🔧 File: frontend/src/tools/security-random-key-generator/index.jsx
// 🔗 NeoPanze — Random Key Generator

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.key) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>✓ Chiave Generata</p>
        <p className='text-sm text-indigo-700'>
          Lunghezza: <span className='font-semibold'>{result.length}</span> caratteri • 
          Encoding: <span className='font-mono'>{result.encoding}</span>
        </p>
        {result.note && (
          <p className='text-xs text-indigo-600 mt-2'>{result.note}</p>
        )}
      </div>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>Chiave casuale</p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia Chiave'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96 break-all'>
        {result.key}
      </pre>
    </div>
  );
}

const definition = {
  id: 'security-random-key-generator',
  fields: [
    {
      type: 'number',
      name: 'length',
      label: 'Lunghezza',
      defaultValue: 32,
      min: 16,
      max: 256,
      helperText: 'Lunghezza della chiave in caratteri (16-256)',
    },
    {
      type: 'select',
      name: 'encoding',
      label: 'Encoding',
      options: [
        { value: 'hex', label: 'Hex (0-9, a-f)' },
        { value: 'base64', label: 'Base64' },
        { value: 'base64url', label: 'Base64URL (URL-safe)' },
      ],
      defaultValue: 'hex',
    },
  ],
  ResultView,
  ctaLabel: 'Genera Chiave',
};

export default definition;


