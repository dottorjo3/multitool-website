// 🔧 File: frontend/src/tools/developer-http-headers-parser/index.jsx
// 🔗 NeoPanze — HTTP Headers Parser

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-3'>
          Headers analizzati ({result.headerCount}):
        </p>
        {result.statusLine && (
          <div className='mb-3 p-2 bg-white rounded border border-indigo-200'>
            <p className='text-xs text-slate-500 mb-1'>Status Line:</p>
            <p className='font-mono text-sm text-slate-900'>{result.statusLine}</p>
          </div>
        )}
        <div className='space-y-2 max-h-96 overflow-y-auto'>
          {Object.entries(result.headers).map(([key, value]) => (
            <div key={key} className='p-2 bg-white rounded border border-indigo-200'>
              <p className='text-xs font-semibold text-indigo-900'>{key}:</p>
              <p className='text-sm text-slate-700 break-all'>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'developer-http-headers-parser',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'HTTP Headers',
      placeholder: 'GET / HTTP/1.1\nHost: example.com\nUser-Agent: Mozilla...',
      rows: 10,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Analizza Headers',
};

export default definition;


