// 🔧 File: frontend/src/tools/security-base64url-decode/index.jsx
// 🔗 NeoPanze — Base64URL Decode

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.decoded) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.decoded);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          Base64URL: {result.originalLength} caratteri → Decodificato: {result.decodedLength} caratteri
        </p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia Testo'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96'>
        {result.decoded}
      </pre>
    </div>
  );
}

const definition = {
  id: 'security-base64url-decode',
  fields: [
    {
      type: 'textarea',
      name: 'base64url',
      label: 'Base64URL',
      placeholder: 'SGVsbG8...',
      rows: 8,
      required: true,
      helperText: 'Inserisci testo in formato Base64URL',
    },
  ],
  ResultView,
  ctaLabel: 'Decodifica da Base64URL',
};

export default definition;


