// 🔧 File: frontend/src/tools/data-json-to-xml/index.jsx
// 🔗 NeoPanze — JSON to XML

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.xml) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.xml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          JSON: {result.jsonLength} caratteri → XML: {result.xmlLength} caratteri • 
          Root: <span className='font-mono'>{result.rootElement}</span>
        </p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia XML'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96'>
        {result.xml}
      </pre>
    </div>
  );
}

const definition = {
  id: 'data-json-to-xml',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'JSON da convertire',
      placeholder: '{"item": "value"}',
      rows: 10,
      required: true,
    },
    {
      type: 'text',
      name: 'rootElement',
      label: 'Elemento radice',
      defaultValue: 'root',
      helperText: 'Nome del tag XML radice',
    },
    {
      type: 'checkbox',
      name: 'pretty',
      label: 'Formattazione leggibile',
      defaultValue: 'true',
    },
  ],
  ResultView,
  ctaLabel: 'Converti a XML',
};

export default definition;


