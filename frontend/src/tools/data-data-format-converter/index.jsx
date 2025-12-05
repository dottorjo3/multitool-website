// 🔧 File: frontend/src/tools/data-data-format-converter/index.jsx
// 🔗 NeoPanze — Data Format Converter

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.converted) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.converted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          {result.fromFormat.toUpperCase()} → {result.toFormat.toUpperCase()} • 
          Originale: {result.originalLength} caratteri → Convertito: {result.convertedLength} caratteri
        </p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96'>
        {result.converted}
      </pre>
    </div>
  );
}

const definition = {
  id: 'data-data-format-converter',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Dati da convertire',
      placeholder: 'Incolla JSON, YAML, CSV...',
      rows: 10,
      required: true,
    },
    {
      type: 'select',
      name: 'fromFormat',
      label: 'Formato origine',
      options: [
        { value: 'json', label: 'JSON' },
        { value: 'yaml', label: 'YAML' },
        { value: 'csv', label: 'CSV' },
        { value: 'xml', label: 'XML' },
      ],
      defaultValue: 'json',
    },
    {
      type: 'select',
      name: 'toFormat',
      label: 'Formato destinazione',
      options: [
        { value: 'json', label: 'JSON' },
        { value: 'yaml', label: 'YAML' },
        { value: 'csv', label: 'CSV' },
        { value: 'xml', label: 'XML' },
      ],
      defaultValue: 'csv',
    },
  ],
  ResultView,
  ctaLabel: 'Converti',
};

export default definition;


