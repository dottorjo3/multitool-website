// 🔧 File: frontend/src/tools/image-saturation/index.jsx
// 🔗 NeoPanze — Image Saturation

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
        <h3 className='text-lg font-semibold text-green-800'>Saturazione modificata</h3>
        <p className='text-sm text-green-700'>
          Saturazione: {result.saturation}x • Dimensione: {(result.outputSizeBytes / 1024).toFixed(2)} KB
        </p>
      </div>
      <button
        type='button'
        onClick={() => downloadBase64(result.outputFile)}
        className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700'
      >
        Scarica Immagine
      </button>
    </div>
  );
}

const definition = {
  id: 'image-saturation',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica immagine',
      accept: '.jpg,.jpeg,.png,.webp',
      required: true,
    },
    {
      type: 'number',
      name: 'saturation',
      label: 'Saturazione',
      defaultValue: 1.0,
      min: 0,
      max: 2,
      step: 0.1,
      helperText: '0 = B&W, 1 = Normale, >1 = Più saturo',
    },
  ],
  ResultView,
  ctaLabel: 'Modifica Saturazione',
};

export default definition;


