// 🔧 File: frontend/src/tools/image-batch-compress/index.jsx
// 🔗 NeoPanze — Batch Image Compress

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
        <h3 className='text-lg font-semibold text-green-800'>Immagini compresse</h3>
        <p className='text-sm text-green-700'>
          {result.filesCount} file • Risparmio: {result.compressionRatio}
        </p>
        <p className='text-xs text-slate-600 mt-1'>
          Originale: {(result.totalOriginalSize / 1024).toFixed(2)} KB → 
          Compresso: {(result.totalCompressedSize / 1024).toFixed(2)} KB
        </p>
      </div>
      <button
        type='button'
        onClick={() => downloadBase64(result.outputFile)}
        className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700'
      >
        Scarica ZIP
      </button>
    </div>
  );
}

const definition = {
  id: 'image-batch-compress',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica immagini',
      accept: '.jpg,.jpeg,.png,.webp',
      multiple: true,
      required: true,
    },
    {
      type: 'number',
      name: 'quality',
      label: 'Qualità',
      defaultValue: 80,
      min: 1,
      max: 100,
      helperText: '1-100 (minore = più compressione)',
    },
  ],
  ResultView,
  ctaLabel: 'Comprimi Immagini',
};

export default definition;


