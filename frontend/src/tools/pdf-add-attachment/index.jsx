// 🔧 File: frontend/src/tools/pdf-add-attachment/index.jsx
// 🔗 NeoPanze — Add PDF Attachment

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
        <h3 className='text-lg font-semibold text-green-800'>PDF con allegati</h3>
        <p className='text-sm text-green-700'>
          {result.attachmentsAdded} allegati aggiunti
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
  id: 'pdf-add-attachment',
  fields: [],
  ResultView,
  ctaLabel: 'Aggiungi Allegati',
  acceptsFiles: true,
  maxFiles: 100,
  allowedMimeTypes: ['application/pdf', 'application/*', 'image/*', 'text/*'],
  helperText: 'Il primo file deve essere il PDF, gli altri saranno allegati',
};

export default definition;


