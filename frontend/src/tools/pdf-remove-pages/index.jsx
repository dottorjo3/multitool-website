// 🔧 File: frontend/src/tools/pdf-remove-pages/index.jsx
// 🔗 NeoPanze — Remove PDF Pages

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
        <h3 className='text-lg font-semibold text-green-800'>Pagine rimosse</h3>
        <p className='text-sm text-green-700'>
          {result.pagesRemoved} pagine rimosse • {result.pagesKept} pagine rimaste
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
  id: 'pdf-remove-pages',
  fields: [
    {
      type: 'text',
      name: 'pages',
      label: 'Pagine da rimuovere',
      placeholder: '1,3,5 o 1-5',
      required: true,
      helperText: 'Esempi: 1,3,5 o 1-5',
    },
  ],
  ResultView,
  ctaLabel: 'Rimuovi Pagine',
  acceptsFiles: true,
  maxFiles: 1,
  allowedMimeTypes: ['application/pdf'],
};

export default definition;


