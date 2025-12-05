// 🔧 File: frontend/src/tools/developer-css-validator/index.jsx
// 🔗 NeoPanze — CSS Validator

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4'>
      {result.isValid ? (
        <div className='p-4 bg-green-50 border border-green-200 rounded-lg'>
          <p className='font-semibold text-green-900 mb-2'>✓ CSS Valido</p>
          <p className='text-sm text-green-700'>
            Regole CSS trovate: <span className='font-semibold'>{result.rulesCount}</span>
          </p>
        </div>
      ) : (
        <div className='p-4 bg-red-50 border border-red-200 rounded-lg'>
          <p className='font-semibold text-red-900 mb-2'>✗ CSS Non Valido</p>
          {result.errors.length > 0 && (
            <div className='space-y-1'>
              <p className='text-sm font-semibold text-red-800'>Errori ({result.errorCount}):</p>
              {result.errors.map((error, index) => (
                <p key={index} className='text-sm text-red-700'>• {error}</p>
              ))}
            </div>
          )}
        </div>
      )}
      {result.warnings.length > 0 && (
        <div className='p-4 bg-amber-50 border border-amber-200 rounded-lg'>
          <p className='text-sm font-semibold text-amber-800'>Avvisi ({result.warningCount}):</p>
          {result.warnings.map((warning, index) => (
            <p key={index} className='text-sm text-amber-700'>• {warning}</p>
          ))}
        </div>
      )}
    </div>
  );
}

const definition = {
  id: 'developer-css-validator',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'CSS da validare',
      placeholder: '.class { color: red; }',
      rows: 10,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Valida CSS',
};

export default definition;


