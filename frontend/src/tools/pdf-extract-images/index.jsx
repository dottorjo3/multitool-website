// 🔧 File: frontend/src/tools/pdf-extract-images/index.jsx
// 🔗 Farm Ready — configurazione frontend per PDF Extract Images

import React from 'react';

function ResultView({ result }) {
  if (!result?.extractedImages?.length) {
    return null;
  }

  const downloadAll = () => {
    result.extractedImages.forEach((image) => {
      const link = document.createElement('a');
      link.href = `data:${image.mimeType};base64,${image.base64}`;
      link.download = image.name;
      link.click();
    });
  };

  return (
    <div className='bg-indigo-50 border border-indigo-200 rounded-lg p-4 space-y-4'>
      <h3 className='text-lg font-semibold text-indigo-800'>
        Trovate {result.count} immagini
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700'>
        {result.extractedImages.map((image) => (
          <button
            key={image.name}
            type='button'
            onClick={() => {
              const link = document.createElement('a');
              link.href = `data:${image.mimeType};base64,${image.base64}`;
              link.download = image.name;
              link.click();
            }}
            className='px-4 py-2 bg-white rounded-lg shadow hover:shadow-md text-left'
          >
            <p className='font-medium'>{image.name}</p>
            <p className='text-xs text-gray-500'>{(image.size / 1024).toFixed(2)} KB</p>
          </button>
        ))}
      </div>
      <button
        type='button'
        onClick={downloadAll}
        className='px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700'
      >
        Scarica tutte le immagini
      </button>
    </div>
  );
}

const definition = {
  id: 'pdf-extract-images',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica il PDF da analizzare',
      helperText: 'Estrae tutte le immagini embeddate nel documento.',
      accept: '.pdf',
      multiple: false,
      required: true,
    },
    {
      type: 'text',
      name: 'format',
      label: 'Formato output (png, jpeg, tiff, jp2, jbig2, ccitt)',
      placeholder: 'png',
      defaultValue: 'png',
      helperText: 'Default PNG. Usa “jpeg” per salvare foto JPEG originali.',
    },
    {
      type: 'text',
      name: 'includePageNumber',
      label: 'Includi numero pagina nel nome (true/false)',
      defaultValue: 'true',
    },
  ],
  ResultView,
  ctaLabel: 'Estrai immagini',
};

export default definition;


