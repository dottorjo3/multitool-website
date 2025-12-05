// 🔧 File: frontend/src/tools/data-json-validate-schema/index.jsx
// 🔗 NeoPanze — JSON Validate Schema

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  if (result.isValid) {
    return (
      <div className='p-4 bg-green-50 border border-green-200 rounded-lg'>
        <p className='font-semibold text-green-900 mb-2'>✓ JSON Valido secondo lo schema</p>
        <p className='text-sm text-green-700'>Il JSON rispetta tutte le regole dello schema JSON Schema.</p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='p-4 bg-red-50 border border-red-200 rounded-lg'>
        <p className='font-semibold text-red-900 mb-2'>✗ JSON Non Valido</p>
        <p className='text-sm text-red-700 mb-3'>Trovati {result.errorCount} errori:</p>
        {result.errors && result.errors.length > 0 && (
          <div className='space-y-2'>
            {result.errors.slice(0, 10).map((error, idx) => (
              <div key={idx} className='p-2 bg-red-100 rounded border border-red-300'>
                <p className='text-xs font-semibold text-red-900'>{error.instancePath || '/'}</p>
                <p className='text-xs text-red-700'>{error.message}</p>
              </div>
            ))}
            {result.errors.length > 10 && (
              <p className='text-xs text-red-600'>... e altri {result.errors.length - 10} errori</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const definition = {
  id: 'data-json-validate-schema',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'JSON da validare',
      placeholder: '{"name": "Alice", "age": 25}',
      rows: 10,
      required: true,
    },
    {
      type: 'textarea',
      name: 'schema',
      label: 'JSON Schema',
      placeholder: '{"type": "object", "properties": {...}}',
      rows: 10,
      required: true,
      helperText: 'Incolla uno schema JSON Schema valido',
    },
  ],
  ResultView,
  ctaLabel: 'Valida JSON',
};

export default definition;


