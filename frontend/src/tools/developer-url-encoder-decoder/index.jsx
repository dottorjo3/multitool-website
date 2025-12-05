// 🔧 File: frontend/src/tools/developer-url-encoder-decoder/index.jsx
// 🔗 NeoPanze — URL Encoder/Decoder

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          Modalità: {result.mode === 'encode' ? 'Codifica' : 'Decodifica'}
        </p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96 break-all'>
        {result.result}
      </pre>
      <div className='text-xs text-slate-500'>
        Lunghezza: {result.resultLength} caratteri
      </div>
    </div>
  );
}

const definition = {
  id: 'developer-url-encoder-decoder',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo',
      placeholder: 'Testo da codificare o URL encoded da decodificare...',
      rows: 8,
      required: true,
    },
    {
      type: 'select',
      name: 'mode',
      label: 'Modalità',
      options: [
        { value: 'encode', label: 'Codifica (Text → URL)' },
        { value: 'decode', label: 'Decodifica (URL → Text)' },
      ],
      defaultValue: 'encode',
    },
  ],
  ResultView,
  ctaLabel: 'Converti',
};

export default definition;

