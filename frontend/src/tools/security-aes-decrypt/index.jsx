// 🔧 File: frontend/src/tools/security-aes-decrypt/index.jsx
// 🔗 NeoPanze — AES Decrypt

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.decrypted) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.decrypted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='p-4 bg-green-50 border border-green-100 rounded-lg'>
        <p className='font-semibold text-green-900 mb-2'>✓ Decrittografia Completata</p>
        <p className='text-sm text-green-700'>
          Algoritmo: <span className='font-mono'>{result.algorithm}</span>
        </p>
      </div>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>Testo decrittografato</p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96'>
        {result.decrypted}
      </pre>
    </div>
  );
}

const definition = {
  id: 'security-aes-decrypt',
  fields: [
    {
      type: 'textarea',
      name: 'encrypted',
      label: 'Testo crittografato',
      placeholder: 'Incolla il testo crittografato...',
      rows: 8,
      required: true,
    },
    {
      type: 'password',
      name: 'password',
      label: 'Password',
      placeholder: 'Inserisci la password',
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Decrittografa',
};

export default definition;


