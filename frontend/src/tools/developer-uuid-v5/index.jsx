// 🔧 File: frontend/src/tools/developer-uuid-v5/index.jsx
// 🔗 NeoPanze — UUID v5 Generator

import React from 'react';

function ResultView({ result }) {
  if (!result?.uuid) {
    return null;
  }

  return (
    <div className='space-y-2 text-sm text-slate-600'>
      <p>Namespace: <span className='font-mono text-xs text-slate-500'>{result.namespace}</span></p>
      <p>Name: <span className='font-mono text-xs text-slate-500'>{result.name}</span></p>
      <div className='bg-slate-900 text-slate-50 font-mono text-sm rounded-lg p-4'>{result.uuid}</div>
    </div>
  );
}

const definition = {
  id: 'developer-uuid-v5',
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
        { value: 'dns', label: 'DNS (uuidv5.DNS)' },
        { value: 'url', label: 'URL (uuidv5.URL)' },
        { value: 'custom', label: 'UUID personalizzato' },
      ],
    },
    {
      type: 'text',
      name: 'customNamespace',
      label: 'Namespace personalizzato',
      placeholder: 'Inserisci UUID (36 caratteri)',
    },
  ],
  ResultView,
  ctaLabel: 'Genera UUID v5',
};

export default definition;


