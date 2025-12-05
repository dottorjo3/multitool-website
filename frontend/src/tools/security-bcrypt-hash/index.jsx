// 🔧 File: frontend/src/tools/security-bcrypt-hash/index.jsx
// 🔗 NeoPanze — bcrypt Hash

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
        <p className='font-semibold text-indigo-900 mb-2'>✓ Hash Generato</p>
        <p className='text-sm text-indigo-700'>
          Algoritmo: <span className='font-mono'>{result.algorithm}</span> • 
          Salt Rounds: <span className='font-semibold'>{result.saltRounds}</span>
        </p>
        {result.note && (
          <p className='text-xs text-indigo-600 mt-2'>{result.note}</p>
        )}
      </div>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>Hash bcrypt</p>
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
  id: 'security-bcrypt-hash',
  fields: [
    {
      type: 'password',
      name: 'password',
      label: 'Password',
      placeholder: 'Inserisci una password',
      required: true,
    },
    {
      type: 'number',
      name: 'saltRounds',
      label: 'Salt Rounds',
      defaultValue: 10,
      min: 4,
      max: 15,
      helperText: 'Più alto = più sicuro ma più lento (4-15)',
    },
  ],
  ResultView,
  ctaLabel: 'Genera Hash',
};

export default definition;


