// 🔧 File: frontend/src/tools/developer-jwt-decoder/index.jsx
// 🔗 NeoPanze — JWT Decoder

import React from 'react';

function JsonBlock({ title, data }) {
  return (
    <div className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 space-y-2'>
      <h3 className='text-sm font-semibold text-emerald-300'>{title}</h3>
      <pre className='whitespace-pre-wrap break-words'>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <p>Signature presente: {result.signaturePresent ? 'Sì' : 'No'}</p>
      <JsonBlock title='Header' data={result.header} />
      <JsonBlock title='Payload' data={result.payload} />
    </div>
  );
}

const definition = {
  id: 'developer-jwt-decoder',
  fields: [
    {
      type: 'textarea',
      name: 'token',
      label: 'Token JWT',
      placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      rows: 6,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Decodifica JWT',
};

export default definition;


