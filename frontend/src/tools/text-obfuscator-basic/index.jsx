// 🔧 File: frontend/src/tools/text-obfuscator-basic/index.jsx
// 🔗 NeoPanze — Text Obfuscator Basic

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>Testo offuscato:</p>
        <div className='bg-white p-4 rounded border border-indigo-200'>
          <p className='font-mono text-slate-900 whitespace-pre-wrap break-words'>
            {result.obfuscated}
          </p>
        </div>
        <div className='mt-3 flex gap-4 text-xs text-indigo-700'>
          <span>Livello: <span className='font-semibold'>{result.level}</span></span>
          <span>Lunghezza: {result.length} caratteri</span>
        </div>
      </div>
      
      <div className='p-3 bg-amber-50 border border-amber-200 rounded-lg'>
        <p className='text-xs text-amber-800'>
          ⚠️ Nota: Questo è un obfuscator di base. Per sicurezza reale, usa strumenti di crittografia avanzati.
        </p>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-obfuscator-basic',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da offuscare',
      placeholder: 'Inserisci il testo da offuscare...',
      rows: 8,
      required: true,
    },
    {
      type: 'select',
      name: 'level',
      label: 'Livello di offuscamento',
      options: [
        { value: 'low', label: 'Basso (20%)' },
        { value: 'medium', label: 'Medio (40%)' },
        { value: 'high', label: 'Alto (60%)' },
      ],
      defaultValue: 'medium',
    },
  ],
  ResultView,
  ctaLabel: 'Offusca testo',
};

export default definition;

