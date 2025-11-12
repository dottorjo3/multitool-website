// 🔧 File: frontend/src/tools/pdf-split/index.jsx
// 🔗 Farm Ready — configurazione frontend per PDF Split

import React from 'react';

function ResultView({ result }) {
  if (!result?.pages?.length) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <h3 className='text-lg font-semibold text-indigo-800'>
        PDF diviso in {result.pages.length} pagine
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        {result.pages.map((page, index) => (
          <button
            key={page.name}
            type='button'
            onClick={() => {
              const link = document.createElement('a');
              link.href = `data:${page.mimeType};base64,${page.base64}`;
              link.download = page.name;
              link.click();
            }}
            className='px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm text-left'
          >
            Scarica pagina {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

const definition = {
  id: 'pdf-split',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica il PDF da dividere',
      helperText: 'Il file verrà suddiviso in pagine singole.',
      accept: '.pdf',
      multiple: false,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Dividi PDF',
};

export default definition;

