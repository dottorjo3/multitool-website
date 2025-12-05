// 🔧 File: frontend/src/tools/pdf-rotate-specific/index.jsx
// 🔗 NeoPanze — Rotate Specific Pages

import React from 'react';

function downloadBase64({ base64, name, mimeType }) {
  const link = document.createElement('a');
  link.href = `data:${mimeType};base64,${base64}`;
  link.download = name;
  link.click();
}

function ResultView({ result }) {
  if (!result?.outputFile) {
    return null;
  }

  return (
    <div className='bg-green-50 border border-green-200 rounded-lg p-4 space-y-3'>
      <div>
        <h3 className='text-lg font-semibold text-green-800'>Pagine ruotate</h3>
        <p className='text-sm text-green-700'>
          {result.pagesRotated} pagine ruotate di {result.angle}°
        </p>
      </div>
      <button
        type='button'
        onClick={() => downloadBase64(result.outputFile)}
        className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700'
      >
        Scarica PDF
      </button>
    </div>
  );
}

const definition = {
  id: 'pdf-rotate-specific',
  fields: [
    {
      type: 'text',
      name: 'pages',
      label: 'Pagine (opzionale)',
      placeholder: 'all, 1-5, 1,3,5',
      defaultValue: 'all',
      helperText: 'Lascia "all" per ruotare tutte le pagine',
    },
    {
      type: 'select',
      name: 'angle',
      label: 'Angolo',
      options: [
        { value: '90', label: '90° (orario)' },
        { value: '180', label: '180°' },
        { value: '270', label: '270° (antiorario)' },
        { value: '-90', label: '-90° (antiorario)' },
      ],
      defaultValue: '90',
    },
  ],
  ResultView,
  ctaLabel: 'Ruota Pagine',
  acceptsFiles: true,
  maxFiles: 1,
  allowedMimeTypes: ['application/pdf'],
};

export default definition;


