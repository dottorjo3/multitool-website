// 🔧 File: frontend/src/tools/pdf-compress-advanced/index.jsx
// 🔗 NeoPanze — Advanced PDF Compress

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
        <h3 className='text-lg font-semibold text-green-800'>PDF compresso</h3>
        <p className='text-sm text-green-700'>
          Originale: {(result.originalSize / 1024).toFixed(2)} KB → {(result.compressedSize / 1024).toFixed(2)} KB
        </p>
        <p className='text-sm text-green-600 font-semibold'>
          Risparmio: {result.compressionRatio}
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
  id: 'pdf-compress-advanced',
  fields: [
    {
      type: 'select',
      name: 'quality',
      label: 'Qualità',
      options: [
        { value: 'low', label: 'Bassa (massima compressione)' },
        { value: 'medium', label: 'Media (bilanciata)' },
        { value: 'high', label: 'Alta (qualità migliore)' },
      ],
      defaultValue: 'medium',
    },
    {
      type: 'checkbox',
      name: 'removeMetadata',
      label: 'Rimuovi metadata',
      defaultValue: 'false',
    },
    {
      type: 'checkbox',
      name: 'optimizeImages',
      label: 'Ottimizza immagini',
      defaultValue: 'true',
    },
  ],
  ResultView,
  ctaLabel: 'Comprimi PDF',
  acceptsFiles: true,
  maxFiles: 1,
  allowedMimeTypes: ['application/pdf'],
};

export default definition;


