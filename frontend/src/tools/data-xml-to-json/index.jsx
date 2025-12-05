// 🔧 File: frontend/src/tools/data-xml-to-json/index.jsx
// 🔗 NeoPanze — XML to JSON

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.json) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          XML: {result.xmlLength} caratteri → JSON: {result.jsonLength} caratteri
        </p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia JSON'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96'>
        {result.json}
      </pre>
    </div>
  );
}

const definition = {
  id: 'data-xml-to-json',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'XML da convertire',
      placeholder: '<root><item>value</item></root>',
      rows: 10,
      required: true,
    },
    {
      type: 'checkbox',
      name: 'compact',
      label: 'Modalità compatta',
      defaultValue: 'false',
      helperText: 'Elimina array per elementi singoli',
    },
  ],
  ResultView,
  ctaLabel: 'Converti a JSON',
};

export default definition;


