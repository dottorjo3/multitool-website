// 🔧 File: frontend/src/tools/security-crc32-calculator/index.jsx
// 🔗 NeoPanze — CRC32 Calculator

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.checksum) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.checksum);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>✓ Checksum Calcolato</p>
        <p className='text-sm text-indigo-700'>
          Algoritmo: <span className='font-mono'>{result.algorithm}</span> • 
          Lunghezza input: {result.length} caratteri
        </p>
        {result.note && (
          <p className='text-xs text-indigo-600 mt-2'>{result.note}</p>
        )}
      </div>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>CRC32 Checksum</p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia Checksum'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-48 break-all'>
        {result.checksum}
      </pre>
    </div>
  );
}

const definition = {
  id: 'security-crc32-calculator',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo o file',
      placeholder: 'Inserisci del testo...',
      rows: 8,
      required: true,
      helperText: 'Calcola CRC32 checksum per rilevare errori',
    },
  ],
  ResultView,
  ctaLabel: 'Calcola CRC32',
};

export default definition;


