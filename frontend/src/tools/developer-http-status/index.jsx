// 🔧 File: frontend/src/tools/developer-http-status/index.jsx
// 🔗 NeoPanze — HTTP Status Lookup

import React from 'react';

function ResultView({ result }) {
  if (!result) return null;

  return (
    <div className='space-y-3 text-sm text-slate-600'>
      <div className='flex items-center gap-3'>
        <span className='text-3xl font-bold text-indigo-600'>{result.code}</span>
        <div>
          <p className='text-lg font-semibold text-slate-900'>{result.phrase}</p>
          <p className='text-xs uppercase text-slate-400 tracking-wide'>{result.category}</p>
        </div>
      </div>
      <p className='bg-slate-100 rounded-xl px-4 py-3 border border-slate-200'>{result.description}</p>
      <p className='text-xs text-slate-400'>
        {result.standardized ? 'Status standard registrato da IANA.' : 'Codice non standard o personalizzato.'}
      </p>
    </div>
  );
}

const definition = {
  id: 'developer-http-status',
  fields: [
    {
      type: 'number',
      name: 'code',
      label: 'Codice HTTP',
      placeholder: 'Es. 200, 404, 500...',
      min: 100,
      max: 599,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Analizza codice',
};

export default definition;


