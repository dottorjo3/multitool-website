// 🔧 File: frontend/src/tools/security-pbkdf2-hash/index.jsx
// 🔗 NeoPanze — PBKDF2 Hash

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.hashed) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.hashed);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>✓ Hash PBKDF2 Generato</p>
        <p className='text-sm text-indigo-700'>
          Algoritmo: <span className='font-mono'>{result.algorithm}</span> • 
          Iterazioni: <span className='font-semibold'>{result.iterations}</span>
        </p>
        {result.note && (
          <p className='text-xs text-indigo-600 mt-2'>{result.note}</p>
        )}
      </div>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>Hash PBKDF2</p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia Hash'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96 break-all'>
        {result.hashed}
      </pre>
      <p className='text-xs text-slate-500'>Salt: <span className='font-mono'>{result.salt}</span></p>
    </div>
  );
}

const definition = {
  id: 'security-pbkdf2-hash',
  fields: [
    {
      type: 'password',
      name: 'password',
      label: 'Password',
      placeholder: 'Inserisci una password',
      required: true,
    },
    {
      type: 'text',
      name: 'salt',
      label: 'Salt (opzionale)',
      placeholder: 'Lascia vuoto per generare automaticamente',
      helperText: 'Se lasciato vuoto, viene generato un salt casuale',
    },
    {
      type: 'number',
      name: 'iterations',
      label: 'Iterazioni',
      defaultValue: 100000,
      min: 1000,
      max: 1000000,
      helperText: 'Numero di iterazioni (più alto = più sicuro ma più lento)',
    },
    {
      type: 'select',
      name: 'algorithm',
      label: 'Algoritmo',
      options: [
        { value: 'sha256', label: 'SHA256' },
        { value: 'sha512', label: 'SHA512' },
      ],
      defaultValue: 'sha256',
    },
  ],
  ResultView,
  ctaLabel: 'Genera Hash PBKDF2',
};

export default definition;


