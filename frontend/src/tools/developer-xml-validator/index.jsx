// 🔧 File: frontend/src/tools/developer-xml-validator/index.jsx
// 🔗 NeoPanze — XML Validator

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  if (result.isValid) {
    return (
      <div className='p-4 bg-green-50 border border-green-200 rounded-lg'>
        <p className='font-semibold text-green-900 mb-2'>✓ XML Valido</p>
        {result.rootElement && (
          <p className='text-sm text-green-700'>
            Elemento radice: <span className='font-semibold'>{result.rootElement}</span>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className='p-4 bg-red-50 border border-red-200 rounded-lg'>
      <p className='font-semibold text-red-900 mb-2'>✗ XML Non Valido</p>
      <p className='text-sm text-red-700'>{result.error}</p>
      {result.errorPosition && (
        <p className='text-xs text-red-600 mt-2'>{result.errorPosition}</p>
      )}
    </div>
  );
}

const definition = {
  id: 'developer-xml-validator',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'XML da validare',
      placeholder: '<root><item>value</item></root>',
      rows: 10,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Valida XML',
};

export default definition;


