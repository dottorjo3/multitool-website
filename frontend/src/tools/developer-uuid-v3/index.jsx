// 🔧 File: frontend/src/tools/developer-uuid-v3/index.jsx
// 🔗 NeoPanze — UUID v3 Generator

import React from 'react';

function ResultView({ result }) {
  if (!result?.uuid) return null;

  return (
    <div className='space-y-3 text-sm text-slate-600'>
      <p className='text-xs uppercase text-slate-400'>UUID v3 deterministico</p>
      <div className='bg-slate-900 text-slate-50 font-mono text-sm rounded-xl p-4'>{result.uuid}</div>
      <div className='rounded-xl border border-slate-200 bg-white text-xs divide-y'>
        <div className='px-4 py-2 flex justify-between'>
          <span className='font-semibold text-slate-700'>Namespace</span>
          <span className='text-slate-500 break-all'>{result.namespace}</span>
        </div>
        <div className='px-4 py-2 flex justify-between'>
          <span className='font-semibold text-slate-700'>Name</span>
          <span className='text-slate-500 break-all'>{result.name}</span>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'developer-uuid-v3',
  fields: [
    {
      type: 'text',
      name: 'name',
      label: 'Valore',
      placeholder: 'esempio.com',
      required: true,
    },
    {
      type: 'select',
      name: 'namespace',
      label: 'Namespace',
      defaultValue: 'dns',
      options: [
        { value: 'dns', label: 'DNS' },
        { value: 'url', label: 'URL' },
        { value: 'custom', label: 'UUID personalizzato' },
      ],
    },
    {
      type: 'text',
      name: 'customNamespace',
      label: 'Namespace personalizzato',
      placeholder: 'UUID (36 caratteri)',
    },
  ],
  ResultView,
  ctaLabel: 'Genera UUID v3',
};

export default definition;


