// 🔧 File: frontend/src/tools/pdf-merge/index.jsx
// 🔗 Farm Ready — configurazione frontend per PDF Merge

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
        <h3 className='text-lg font-semibold text-green-800'>PDF unito pronto</h3>
        <p className='text-sm text-green-700'>
          Dimensione finale: {(result.outputSizeBytes / 1024).toFixed(2)} KB
        </p>
      </div>
      <button
        type='button'
        onClick={() => downloadBase64(result.outputFile)}
        className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700'
      >
        Scarica PDF Unito
      </button>
    </div>
  );
}

const definition = {
  id: 'pdf-merge',
  fields: [
    {
      type: 'file',
      name: 'files',
      label: 'Carica i PDF da unire',
      helperText: 'Seleziona almeno due file PDF (max 200 MB ciascuno).',
      accept: '.pdf',
      multiple: true,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Unisci PDF',
};

export default definition;

