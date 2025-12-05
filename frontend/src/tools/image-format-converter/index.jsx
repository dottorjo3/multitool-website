// 🔧 File: frontend/src/tools/image-format-converter/index.jsx
// 🔗 NeoPanze — Format Converter

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
        <h3 className='text-lg font-semibold text-green-800'>Immagine convertita</h3>
        <p className='text-sm text-green-700'>
          Da {result.originalFormat} a {result.targetFormat} • 
          Risparmio: {result.compressionRatio}
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
  id: 'image-format-converter',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica immagine',
      accept: '.jpg,.jpeg,.png,.webp,.avif,.tiff',
      required: true,
    },
    {
      type: 'select',
      name: 'format',
      label: 'Formato destinazione',
      options: [
        { value: 'jpg', label: 'JPG' },
        { value: 'png', label: 'PNG' },
        { value: 'webp', label: 'WebP' },
        { value: 'avif', label: 'AVIF' },
        { value: 'tiff', label: 'TIFF' },
        { value: 'gif', label: 'GIF' },
      ],
      defaultValue: 'jpg',
      required: true,
    },
    {
      type: 'number',
      name: 'quality',
      label: 'Qualità',
      defaultValue: 90,
      min: 1,
      max: 100,
    },
  ],
  ResultView,
  ctaLabel: 'Converti Formato',
};

export default definition;


