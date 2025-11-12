// 🔧 File: frontend/src/tools/developer-hmac-generator/index.jsx
// 🔗 NeoPanze — HMAC Generator

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.hmac) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.hmac);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>
        Algoritmo: {result.algorithm.toUpperCase()} • Encoding: {result.encoding}
      </p>
      <div className='bg-slate-900 text-slate-50 font-mono text-xs rounded-lg p-4 break-all relative'>
        {result.hmac}
        <button
          type='button'
          onClick={handleCopy}
          className='absolute top-2 right-2 text-xs font-semibold text-emerald-300 hover:text-emerald-200'
        >
          {copied ? 'Copiato!' : 'Copia'}
        </button>
      </div>
    </div>
  );
}

const definition = {
  id: 'developer-hmac-generator',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo',
      placeholder: 'Inserisci il testo da firmare...',
      rows: 4,
      required: true,
    },
    {
      type: 'text',
      name: 'secret',
      label: 'Chiave segreta',
      placeholder: 'Es. chiave-super-segreta',
      required: true,
    },
    {
      type: 'select',
      name: 'algorithm',
      label: 'Algoritmo',
      defaultValue: 'sha256',
      options: [
        { value: 'sha1', label: 'SHA1' },
        { value: 'sha256', label: 'SHA256' },
        { value: 'sha384', label: 'SHA384' },
        { value: 'sha512', label: 'SHA512' },
        { value: 'md5', label: 'MD5' },
      ],
    },
    {
      type: 'select',
      name: 'encoding',
      label: 'Encoding',
      defaultValue: 'hex',
      options: [
        { value: 'hex', label: 'Hex' },
        { value: 'base64', label: 'Base64' },
      ],
    },
  ],
  ResultView,
  ctaLabel: 'Genera HMAC',
};

export default definition;


