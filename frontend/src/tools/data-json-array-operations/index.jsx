// 🔧 File: frontend/src/tools/data-json-array-operations/index.jsx
// 🔗 NeoPanze — JSON Array Operations

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.result) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          Operazione: <span className='font-semibold'>{result.operation}</span> • 
          Originale: {result.originalLength} elementi → Risultato: {result.resultLength} elementi
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
        {result.result}
      </pre>
    </div>
  );
}

const definition = {
  id: 'data-json-array-operations',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Array JSON',
      placeholder: '[1, 2, 3, 4, 5]',
      rows: 10,
      required: true,
    },
    {
      type: 'select',
      name: 'operation',
      label: 'Operazione',
      options: [
        { value: 'unique', label: 'Rimuovi duplicati' },
        { value: 'shuffle', label: 'Mescola' },
        { value: 'reverse', label: 'Inverti ordine' },
        { value: 'slice', label: 'Seleziona porzione' },
        { value: 'first', label: 'Primi N elementi' },
        { value: 'last', label: 'Ultimi N elementi' },
      ],
      defaultValue: 'unique',
    },
    {
      type: 'text',
      name: 'start',
      label: 'Inizio (per slice)',
      placeholder: '0',
      helperText: 'Indice di partenza (solo per operazione "slice")',
    },
    {
      type: 'text',
      name: 'end',
      label: 'Fine (per slice)',
      placeholder: '5',
      helperText: 'Indice di fine (solo per operazione "slice")',
    },
    {
      type: 'text',
      name: 'n',
      label: 'Numero elementi (per first/last)',
      placeholder: '5',
      helperText: 'Numero di elementi da prendere (solo per first/last)',
    },
  ],
  ResultView,
  ctaLabel: 'Esegui Operazione',
};

export default definition;


