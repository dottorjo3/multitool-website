// 🔧 File: frontend/src/tools/text-title-case-fix/index.jsx
// 🔗 NeoPanze — Title Case Fix

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>Testo corretto:</p>
        <div className='bg-white p-4 rounded border border-indigo-200'>
          <p className='text-slate-900 whitespace-pre-wrap break-words'>
            {result.fixed}
          </p>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-title-case-fix',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da correggere',
      placeholder: 'Inserisci il testo da correggere in Title Case...',
      rows: 8,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Correggi Title Case',
};

export default definition;

