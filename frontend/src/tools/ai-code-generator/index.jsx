// 🔧 File: frontend/src/tools/ai-code-generator/index.jsx
// 🔗 NeoPanze — AI Code Generator

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.code) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <div className='flex items-center justify-between mb-2'>
          <p className='text-sm text-indigo-600'>
            {result.language} • {result.estimatedLines} righe • Stile: {result.style}
          </p>
          <button
            type='button'
            onClick={handleCopy}
            className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
          >
            {copied ? 'Copiato!' : 'Copia Codice'}
          </button>
        </div>
        <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96'>
          <code>{result.code}</code>
        </pre>
      </div>
    </div>
  );
}

const definition = {
  id: 'ai-code-generator',
  fields: [
    {
      type: 'textarea',
      name: 'description',
      label: 'Descrizione',
      placeholder: 'Descrivi cosa vuoi che il codice faccia...',
      required: true,
      rows: 4,
      helperText: 'Es: "Crea una funzione che ordina un array di numeri"',
    },
    {
      type: 'select',
      name: 'language',
      label: 'Linguaggio',
      options: [
        { value: 'javascript', label: 'JavaScript' },
        { value: 'python', label: 'Python' },
        { value: 'typescript', label: 'TypeScript' },
        { value: 'java', label: 'Java' },
        { value: 'cpp', label: 'C++' },
        { value: 'csharp', label: 'C#' },
        { value: 'php', label: 'PHP' },
        { value: 'ruby', label: 'Ruby' },
        { value: 'go', label: 'Go' },
        { value: 'rust', label: 'Rust' },
      ],
      defaultValue: 'javascript',
    },
    {
      type: 'select',
      name: 'style',
      label: 'Stile',
      options: [
        { value: 'clean', label: 'Pulito e strutturato' },
        { value: 'commented', label: 'Con commenti dettagliati' },
        { value: 'minimal', label: 'Minimale e conciso' },
      ],
      defaultValue: 'clean',
    },
  ],
  ResultView,
  ctaLabel: 'Genera Codice',
};

export default definition;


