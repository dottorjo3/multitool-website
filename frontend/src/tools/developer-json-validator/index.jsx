// 🔧 File: frontend/src/tools/developer-json-validator/index.jsx
// 🔗 NeoPanze — JSON Validator

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  if (result.isValid) {
    return (
      <div className='space-y-4'>
        <div className='p-4 bg-green-50 border border-green-200 rounded-lg'>
          <p className='font-semibold text-green-900 mb-2'>✓ JSON Valido</p>
          <div className='text-sm text-green-700'>
            <p>Tipo: <span className='font-semibold'>{result.type}</span></p>
            {result.keys && (
              <p>Chiavi: <span className='font-mono text-xs'>{result.keys.join(', ')}</span></p>
            )}
            {result.length !== null && (
              <p>Elementi: <span className='font-semibold'>{result.length}</span></p>
            )}
          </div>
        </div>
        {result.formatted && (
          <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96'>
            {result.formatted}
          </pre>
        )}
      </div>
    );
  }

  return (
    <div className='p-4 bg-red-50 border border-red-200 rounded-lg'>
      <p className='font-semibold text-red-900 mb-2'>✗ JSON Non Valido</p>
      <p className='text-sm text-red-700'>{result.error}</p>
      {result.errorPosition && (
        <p className='text-xs text-red-600 mt-2'>Posizione errore: {result.errorPosition}</p>
      )}
    </div>
  );
}

const definition = {
  id: 'developer-json-validator',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'JSON da validare',
      placeholder: '{"key": "value"}',
      rows: 10,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Valida JSON',
};

export default definition;


