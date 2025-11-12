// 🔧 File: frontend/src/tools/developer-url-parser/index.jsx
// 🔗 NeoPanze — URL Parser

import React from 'react';

function ResultRow({ label, value }) {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  return (
    <div className='flex justify-between text-sm text-slate-600 border-b border-slate-100 py-1'>
      <span className='font-medium text-slate-700'>{label}</span>
      <span className='font-mono text-xs text-slate-500 break-all'>{value}</span>
    </div>
  );
}

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <div className='rounded-xl border border-slate-200 shadow-sm p-4 space-y-1'>
        <ResultRow label='Origin' value={result.origin} />
        <ResultRow label='Href' value={result.href} />
        <ResultRow label='Protocollo' value={result.protocol} />
        <ResultRow label='Host' value={result.host} />
        <ResultRow label='Hostname' value={result.hostname} />
        <ResultRow label='Porta' value={result.port} />
        <ResultRow label='Pathname' value={result.pathname} />
        <ResultRow label='Query' value={result.search} />
        <ResultRow label='Hash' value={result.hash} />
        <ResultRow label='Username' value={result.username} />
        <ResultRow label='Password' value={result.password} />
      </div>
      {result.queryParams && Object.keys(result.queryParams).length > 0 && (
        <div className='rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 p-4 space-y-2'>
          <p className='text-sm font-semibold'>Query Params</p>
          {Object.entries(result.queryParams).map(([key, value]) => (
            <div key={key} className='flex justify-between text-xs bg-white/80 rounded-md px-2 py-1 border border-indigo-100'>
              <span>{key}</span>
              <span className='font-mono'>
                {Array.isArray(value) ? value.join(', ') : value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const definition = {
  id: 'developer-url-parser',
  fields: [
    {
      type: 'text',
      name: 'url',
      label: 'URL',
      placeholder: 'https://example.com/path?foo=bar#section',
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Analizza URL',
};

export default definition;


