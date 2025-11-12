// 🔧 File: frontend/src/tools/pdf-rotate/index.jsx
// 🔗 Farm Ready — configurazione frontend per PDF Rotate

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
    <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2'>
      <h3 className='text-lg font-semibold text-blue-800'>Rotazione completata</h3>
      <p className='text-sm text-blue-700'>
        Rotazione applicata: {result.rotation}°
      </p>
      <button
        type='button'
        onClick={download}
        className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
      >
        Scarica PDF ruotato
      </button>
    </div>
  );
}

const definition = {
  id: 'pdf-rotate',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica il PDF da ruotare',
      helperText: 'Ruoteremo tutte le pagine del file selezionato.',
      accept: '.pdf',
      multiple: false,
      required: true,
    },
    {
      type: 'number',
      name: 'rotation',
      label: 'Rotazione (gradi)',
      placeholder: '90',
      defaultValue: 90,
      min: 90,
      max: 270,
      helperText: 'Valori consentiti: 90, 180, 270.',
    },
  ],
  ResultView,
  ctaLabel: 'Ruota PDF',
};

export default definition;

