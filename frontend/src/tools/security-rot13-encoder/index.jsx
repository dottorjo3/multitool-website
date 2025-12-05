// 🔧 File: frontend/src/tools/security-rot13-encoder/index.jsx
// 🔗 NeoPanze — ROT13 Encoder

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
      <div className='p-3 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='text-xs text-indigo-600'>{result.note}</p>
      </div>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>Testo codificato/decodificato</p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96'>
        {result.encoded}
      </pre>
    </div>
  );
}

const definition = {
  id: 'security-rot13-encoder',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo',
      placeholder: 'Inserisci del testo...',
      rows: 8,
      required: true,
      helperText: 'ROT13 è simmetrico: applica due volte per ottenere l\'originale',
    },
  ],
  ResultView,
  ctaLabel: 'Codifica/Decodifica ROT13',
};

export default definition;


