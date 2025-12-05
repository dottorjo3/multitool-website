// 🔧 File: frontend/src/tools/text-extract-emails/index.jsx
// 🔗 NeoPanze — Extract Emails

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900'>
          Email trovate: <span className='text-indigo-600'>{result.count}</span>
        </p>
      </div>
      
      {result.count > 0 ? (
        <div className='space-y-2'>
          <h3 className='font-semibold text-slate-900'>Elenco email:</h3>
          <div className='max-h-96 overflow-y-auto border border-slate-200 rounded-lg p-4 space-y-2'>
            {result.emails.map((email, index) => (
              <div key={index} className='p-2 bg-slate-50 rounded border border-slate-200'>
                <p className='font-mono text-sm text-slate-900 break-all'>{email}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className='text-slate-500'>Nessuna email trovata nel testo.</p>
      )}
    </div>
  );
}

const definition = {
  id: 'text-extract-emails',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da analizzare',
      placeholder: 'Inserisci il testo da cui estrarre le email...',
      rows: 8,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Estrai email',
};

export default definition;

