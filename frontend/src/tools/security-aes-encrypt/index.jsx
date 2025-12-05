// 🔧 File: frontend/src/tools/security-aes-encrypt/index.jsx
// 🔗 NeoPanze — AES Encrypt

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.encrypted) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.encrypted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>✓ Crittografia Completata</p>
        <p className='text-sm text-indigo-700'>
          Algoritmo: <span className='font-mono'>{result.algorithm}</span>
        </p>
        {result.note && (
          <p className='text-xs text-indigo-600 mt-2'>{result.note}</p>
        )}
      </div>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>Testo crittografato</p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96 break-all'>
        {result.encrypted}
      </pre>
    </div>
  );
}

const definition = {
  id: 'security-aes-encrypt',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo da crittografare',
      placeholder: 'Inserisci il testo segreto...',
      rows: 8,
      required: true,
    },
    {
      type: 'password',
      name: 'password',
      label: 'Password',
      placeholder: 'Inserisci una password sicura',
      required: true,
      helperText: 'Usa questa password per decrittografare in seguito',
    },
  ],
  ResultView,
  ctaLabel: 'Crittografa',
};

export default definition;


