// 🔧 File: frontend/src/tools/pdf-to-png/index.jsx
// 🔗 NeoPanze — PDF to PNG

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
      <p className='font-semibold text-indigo-900 mb-2'>
        PDF: {result.fileName}
      </p>
      <p className='text-sm text-indigo-600'>
        {result.pagesToConvert} pagine da convertire • DPI: {result.dpi}
      </p>
      {result.note && (
        <p className='text-xs text-indigo-500 mt-2'>{result.note}</p>
      )}
    </div>
  );
}

const definition = {
  id: 'pdf-to-png',
  fields: [
    {
      type: 'number',
      name: 'maxPages',
      label: 'Pagine max',
      defaultValue: 5,
      min: 1,
      max: 50,
    },
    {
      type: 'number',
      name: 'dpi',
      label: 'DPI',
      defaultValue: 150,
      min: 72,
      max: 300,
    },
  ],
  ResultView,
  ctaLabel: 'Converti',
  acceptsFiles: true,
  maxFiles: 1,
  allowedMimeTypes: ['application/pdf'],
};

export default definition;


