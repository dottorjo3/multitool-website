// 🔧 File: frontend/src/tools/security-argon2-hash/index.jsx
// 🔗 NeoPanze — Argon2 Hash

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
        <p className='font-semibold text-indigo-900 mb-2'>✓ Hash Argon2 Generato</p>
        <p className='text-sm text-indigo-700'>
          Tipo: <span className='font-mono'>{result.type}</span>
        </p>
        {result.note && (
          <p className='text-xs text-indigo-600 mt-2'>{result.note}</p>
        )}
      </div>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>Hash Argon2</p>
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
    </div>
  );
}

const definition = {
  id: 'security-argon2-hash',
  fields: [
    {
      type: 'password',
      name: 'password',
      label: 'Password',
      placeholder: 'Inserisci una password',
      required: true,
    },
    {
      type: 'select',
      name: 'type',
      label: 'Tipo Argon2',
      options: [
        { value: 'argon2id', label: 'Argon2id (consigliato)' },
        { value: 'argon2i', label: 'Argon2i' },
        { value: 'argon2d', label: 'Argon2d' },
      ],
      defaultValue: 'argon2id',
    },
  ],
  ResultView,
  ctaLabel: 'Genera Hash Argon2',
};

export default definition;


