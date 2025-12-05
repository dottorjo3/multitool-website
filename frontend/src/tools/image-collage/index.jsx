// 🔧 File: frontend/src/tools/image-collage/index.jsx
// 🔗 NeoPanze — Image Collage

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
        <h3 className='text-lg font-semibold text-green-800'>Collage creato</h3>
        <p className='text-sm text-green-700'>
          {result.imagesCount} immagini • Layout: {result.layout} • {result.dimensions}
        </p>
      </div>
      <button
        type='button'
        onClick={() => downloadBase64(result.outputFile)}
        className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700'
      >
        Scarica Collage
      </button>
    </div>
  );
}

const definition = {
  id: 'image-collage',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica immagini',
      accept: '.jpg,.jpeg,.png,.webp',
      multiple: true,
      required: true,
      helperText: 'Seleziona almeno 2 immagini',
    },
    {
      type: 'select',
      name: 'layout',
      label: 'Layout',
      options: [
        { value: 'grid', label: 'Griglia' },
        { value: 'horizontal', label: 'Orizzontale' },
        { value: 'vertical', label: 'Verticale' },
      ],
      defaultValue: 'grid',
    },
    {
      type: 'number',
      name: 'columns',
      label: 'Colonne (solo per griglia)',
      defaultValue: 2,
      min: 1,
      max: 10,
    },
  ],
  ResultView,
  ctaLabel: 'Crea Collage',
};

export default definition;


