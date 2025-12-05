// 🔧 File: frontend/src/tools/security-hex-decode/index.jsx
// 🔗 NeoPanze — Hex Decode

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
          Hex: {result.originalLength} caratteri → Decodificato: {result.decodedLength} caratteri
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
  id: 'security-hex-decode',
  fields: [
    {
      type: 'textarea',
      name: 'hex',
      label: 'Testo Hex',
      placeholder: '48656c6c6f...',
      rows: 8,
      required: true,
      helperText: 'Inserisci testo in formato esadecimale (solo 0-9, a-f, A-F)',
    },
  ],
  ResultView,
  ctaLabel: 'Decodifica da Hex',
};

export default definition;


