// 🔧 File: frontend/src/tools/pdf-password-remove/index.jsx
// 🔗 NeoPanze — Remove PDF Password

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
        <h3 className='text-lg font-semibold text-green-800'>Password rimossa</h3>
        <p className='text-sm text-green-700'>
          PDF sbloccato con successo
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
  id: 'pdf-password-remove',
  fields: [
    {
      type: 'password',
      name: 'password',
      label: 'Password PDF',
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Rimuovi Password',
  acceptsFiles: true,
  maxFiles: 1,
  allowedMimeTypes: ['application/pdf'],
};

export default definition;


