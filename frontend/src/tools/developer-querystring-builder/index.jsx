// 🔧 File: frontend/src/tools/developer-querystring-builder/index.jsx
// 🔗 NeoPanze — Querystring Builder

import React from 'react';

function ResultView({ result }) {
  if (!result?.queryString) return null;

  return (
    <div className='space-y-3 text-sm text-slate-600'>
      <div>
        <p className='text-xs uppercase text-slate-400'>Query string</p>
        <textarea
          readOnly
          className='w-full rounded-xl border border-slate-200 bg-slate-900 text-slate-50 font-mono text-xs p-3'
          rows={result.queryString.length < 120 ? 3 : 6}
          value={result.queryString}
        />
      </div>
      {result.fullUrl && (
        <div>
          <p className='text-xs uppercase text-slate-400'>URL completo</p>
          <textarea
            readOnly
            className='w-full rounded-xl border border-slate-200 bg-slate-900 text-slate-50 font-mono text-xs p-3'
            rows={result.fullUrl.length < 120 ? 3 : 6}
            value={result.fullUrl}
          />
        </div>
      )}
      <div className='rounded-xl border border-slate-200 divide-y bg-white'>
        {result.pairs.map(({ key, value }) => (
          <div key={`${key}-${value}`} className='px-4 py-2 flex justify-between gap-4 text-xs'>
            <span className='font-semibold text-slate-700'>{key}</span>
            <span className='text-slate-500 break-all'>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const definition = {
  id: 'developer-querystring-builder',
  fields: [
    {
      type: 'textarea',
      name: 'lines',
      label: 'Coppie chiave/valore',
      placeholder: 'name=Bibble\nfreeTools=75\ncolor=purple',
      rows: 8,
      required: true,
    },
    {
      type: 'text',
      name: 'delimiter',
      label: 'Separatore',
      defaultValue: '=',
      maxLength: 3,
    },
    {
      type: 'checkbox',
      name: 'encode',
      label: 'URL encode valori',
      defaultValue: 'true',
    },
    {
      type: 'text',
      name: 'baseUrl',
      label: 'URL base (opzionale)',
      placeholder: 'https://example.com/search',
    },
  ],
  ResultView,
  ctaLabel: 'Genera querystring',
};

export default definition;


