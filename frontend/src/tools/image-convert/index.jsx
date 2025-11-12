// 🔧 File: frontend/src/tools/image-convert/index.jsx
// 🔗 Farm Ready — Conversione multi-file con download singolo

import React from 'react';

function download({ base64, mimeType, name }) {
  const link = document.createElement('a');
  link.href = `data:${mimeType};base64,${base64}`;
  link.download = name;
  link.click();
}

function ResultView({ result }) {
  if (!result?.files?.length) {
    return null;
  }

  return (
    <div className='bg-purple-50 border border-purple-200 rounded-lg p-4 space-y-3'>
      <h3 className='text-lg font-semibold text-purple-800'>
        Conversione completata in {result.format?.toUpperCase()}
      </h3>
      <ul className='space-y-2'>
        {result.files.map((file) => (
          <li key={file.outputFile.name} className='flex items-center justify-between bg-white/70 border border-purple-100 rounded-lg px-3 py-2'>
            <div>
              <p className='text-sm font-medium text-purple-800'>{file.outputFile.name}</p>
              <p className='text-xs text-purple-600'>Da: {file.originalName}</p>
            </div>
            <button
              type='button'
              onClick={() => download(file.outputFile)}
              className='text-sm font-semibold text-purple-600 hover:text-purple-800'
            >
              Scarica
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const definition = {
  id: 'image-convert',
  fields: [
    {
      type: 'file',
      name: 'files',
      label: 'Carica immagini da convertire',
      helperText: 'Puoi selezionare più file insieme. Max 200 MB ciascuno.',
      accept: '.jpg,.jpeg,.png,.webp,.avif,.tiff,.tif',
      multiple: true,
      required: true,
    },
    {
      type: 'select',
      name: 'format',
      label: 'Formato destinazione',
      required: true,
      placeholder: 'Scegli il formato',
      options: [
        { value: 'jpeg', label: 'JPEG (.jpg)' },
        { value: 'png', label: 'PNG (.png)' },
        { value: 'webp', label: 'WebP (.webp)' },
        { value: 'avif', label: 'AVIF (.avif)' },
        { value: 'tiff', label: 'TIFF (.tiff)' },
      ],
    },
    {
      type: 'number',
      name: 'quality',
      label: 'Qualità (opzionale)',
      placeholder: '85',
      min: 1,
      max: 100,
      helperText: 'Se non specificato usiamo un valore ottimale per il formato scelto.',
    },
  ],
  ResultView,
  ctaLabel: 'Converti immagini',
};

export default definition;


