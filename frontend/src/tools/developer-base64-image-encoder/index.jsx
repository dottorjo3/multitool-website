// 🔧 File: frontend/src/tools/developer-base64-image-encoder/index.jsx
// 🔗 NeoPanze — Base64 Image Encoder

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result) {
    return null;
  }

  const handleCopy = async () => {
    const textToCopy = result.mode === 'encode' ? result.dataUrl : result.decoded;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          Modalità: {result.mode === 'encode' ? 'Codifica' : 'Decodifica'}
          {result.mimeType && ` • MIME: ${result.mimeType}`}
        </p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia'}
        </button>
      </div>
      {result.mode === 'encode' ? (
        <div className='space-y-2'>
          <div>
            <p className='text-xs text-slate-500 mb-1'>Base64:</p>
            <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-48 break-all'>
              {result.base64}
            </pre>
          </div>
          <div>
            <p className='text-xs text-slate-500 mb-1'>Data URL:</p>
            <pre className='bg-indigo-50 text-indigo-900 text-xs rounded-lg p-4 overflow-auto max-h-48 break-all border border-indigo-200'>
              {result.dataUrl}
            </pre>
          </div>
        </div>
      ) : (
        <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96 break-all'>
          {result.decoded}
        </pre>
      )}
    </div>
  );
}

const definition = {
  id: 'developer-base64-image-encoder',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo',
      placeholder: 'Inserisci testo o Base64...',
      rows: 8,
      required: true,
    },
    {
      type: 'select',
      name: 'mode',
      label: 'Modalità',
      options: [
        { value: 'encode', label: 'Codifica (Text → Base64)' },
        { value: 'decode', label: 'Decodifica (Base64 → Text)' },
      ],
      defaultValue: 'encode',
    },
    {
      type: 'text',
      name: 'mimeType',
      label: 'MIME Type (solo per codifica)',
      placeholder: 'text/plain, image/png, etc.',
      defaultValue: 'text/plain',
    },
  ],
  ResultView,
  ctaLabel: 'Converti',
};

export default definition;


