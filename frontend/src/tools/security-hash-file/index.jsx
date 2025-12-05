// 🔧 File: frontend/src/tools/security-hash-file/index.jsx
// 🔗 NeoPanze — Hash File

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.hash) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>✓ Hash Calcolato</p>
        <p className='text-sm text-indigo-700'>
          File: <span className='font-semibold'>{result.fileName}</span> • 
          Dimensione: {(result.fileSize / 1024).toFixed(2)} KB
        </p>
        <p className='text-sm text-indigo-700'>
          Algoritmo: <span className='font-mono'>{result.algorithm}</span> • 
          Encoding: <span className='font-mono'>{result.encoding}</span>
        </p>
      </div>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>Hash</p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia Hash'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-48 break-all'>
        {result.hash}
      </pre>
      <p className='text-xs text-slate-500 font-mono'>{result.checksum}</p>
    </div>
  );
}

const definition = {
  id: 'security-hash-file',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'File',
      required: true,
      helperText: 'Carica un file per calcolare l\'hash',
    },
    {
      type: 'select',
      name: 'algorithm',
      label: 'Algoritmo',
      options: [
        { value: 'md5', label: 'MD5' },
        { value: 'sha1', label: 'SHA1' },
        { value: 'sha256', label: 'SHA256' },
        { value: 'sha384', label: 'SHA384' },
        { value: 'sha512', label: 'SHA512' },
      ],
      defaultValue: 'sha256',
    },
    {
      type: 'select',
      name: 'encoding',
      label: 'Encoding',
      options: [
        { value: 'hex', label: 'Hex' },
        { value: 'base64', label: 'Base64' },
      ],
      defaultValue: 'hex',
    },
  ],
  ResultView,
  ctaLabel: 'Calcola Hash',
};

export default definition;


