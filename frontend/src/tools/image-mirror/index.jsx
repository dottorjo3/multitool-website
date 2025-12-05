// 🔧 File: frontend/src/tools/image-mirror/index.jsx
// 🔗 NeoPanze — Image Mirror

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
        <h3 className='text-lg font-semibold text-green-800'>Immagine specchiata</h3>
        <p className='text-sm text-green-700'>
          Direzione: {result.direction === 'horizontal' ? 'Orizzontale' : result.direction === 'vertical' ? 'Verticale' : 'Entrambe'}
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
  id: 'image-mirror',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica immagine',
      accept: '.jpg,.jpeg,.png,.webp',
      required: true,
    },
    {
      type: 'select',
      name: 'direction',
      label: 'Direzione',
      options: [
        { value: 'horizontal', label: 'Orizzontale (sinistra ↔ destra)' },
        { value: 'vertical', label: 'Verticale (alto ↔ basso)' },
        { value: 'both', label: 'Entrambe' },
      ],
      defaultValue: 'horizontal',
    },
  ],
  ResultView,
  ctaLabel: 'Specchia Immagine',
};

export default definition;


