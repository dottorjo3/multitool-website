// 🔧 File: frontend/src/tools/pdf-compress/index.jsx
// 🔗 Farm Ready — configurazione frontend per PDF Compress

import React from 'react';

function ResultView({ result }) {
  if (!result?.outputFile) {
    return null;
  }

  const ratio = result.compressionRatio
    ? Math.round((1 - result.compressionRatio) * 100)
    : null;

  return (
    <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-2'>
      <h3 className='text-lg font-semibold text-yellow-800'>Compressione completata</h3>
      <p className='text-sm text-yellow-700'>
        Da {(result.originalSizeBytes / 1024).toFixed(2)} KB a {(result.outputSizeBytes / 1024).toFixed(2)} KB
        {ratio ? ` (−${ratio}%)` : ''}
      </p>
      <button
        type='button'
        onClick={() => {
          const link = document.createElement('a');
          link.href = `data:${result.outputFile.mimeType};base64,${result.outputFile.base64}`;
          link.download = result.outputFile.name;
          link.click();
        }}
        className='px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700'
      >
        Scarica PDF Compresso
      </button>
    </div>
  );
}

const definition = {
  id: 'pdf-compress',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica il PDF da comprimere',
      helperText: 'Il PDF verrà ricostruito con oggetti compressi.',
      accept: '.pdf',
      multiple: false,
      required: true,
    },
    {
      type: 'number',
      name: 'quality',
      label: 'Qualità (1-100)',
      placeholder: '75',
      defaultValue: 75,
      min: 1,
      max: 100,
      required: false,
    },
  ],
  ResultView,
  ctaLabel: 'Comprimi PDF',
};

export default definition;

