// 🔧 File: frontend/src/tools/pdf-watermark/index.jsx
// 🔗 Farm Ready — configurazione frontend per PDF Watermark

import React from 'react';

function ResultView({ result }) {
  if (!result?.outputFile) {
    return null;
  }

  const download = () => {
    const link = document.createElement('a');
    link.href = `data:${result.outputFile.mimeType};base64,${result.outputFile.base64}`;
    link.download = result.outputFile.name;
    link.click();
  };

  return (
    <div className='bg-rose-50 border border-rose-200 rounded-lg p-4 space-y-2'>
      <h3 className='text-lg font-semibold text-rose-800'>Watermark applicato</h3>
      <p className='text-sm text-rose-700'>
        Testo usato: <strong>{result.watermarkText}</strong>
      </p>
      <button
        type='button'
        onClick={download}
        className='px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700'
      >
        Scarica PDF con watermark
      </button>
    </div>
  );
}

const definition = {
  id: 'pdf-watermark',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica il PDF da proteggere',
      helperText: 'Il watermark verrà applicato diagonalmente su ogni pagina.',
      accept: '.pdf',
      multiple: false,
      required: true,
    },
    {
      type: 'text',
      name: 'text',
      label: 'Testo watermark',
      placeholder: 'CONFIDENTIAL',
      required: true,
    },
    {
      type: 'number',
      name: 'fontSize',
      label: 'Dimensione testo',
      defaultValue: 48,
      min: 12,
      max: 120,
    },
    {
      type: 'number',
      name: 'opacity',
      label: 'Opacità (0.05 - 1.0)',
      step: 0.05,
      defaultValue: 0.2,
      min: 0.05,
      max: 1,
    },
  ],
  ResultView,
  ctaLabel: 'Applica watermark',
};

export default definition;

