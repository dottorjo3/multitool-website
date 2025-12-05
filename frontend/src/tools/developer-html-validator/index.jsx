// 🔧 File: frontend/src/tools/developer-html-validator/index.jsx
// 🔗 NeoPanze — HTML Validator

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4'>
      {result.isValid ? (
        <div className='p-4 bg-green-50 border border-green-200 rounded-lg'>
          <p className='font-semibold text-green-900'>✓ HTML Valido</p>
        </div>
      ) : (
        <div className='p-4 bg-red-50 border border-red-200 rounded-lg'>
          <p className='font-semibold text-red-900 mb-2'>✗ HTML Non Valido</p>
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
  id: 'developer-html-validator',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'HTML da validare',
      placeholder: '<div><p>Content</p></div>',
      rows: 10,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Valida HTML',
};

export default definition;


