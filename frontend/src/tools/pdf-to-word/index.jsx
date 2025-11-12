// 🔧 File: frontend/src/tools/pdf-to-word/index.jsx
// 🔗 Farm Ready — configurazione frontend per PDF to Word (DOCX)

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
    <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3'>
      <h3 className='text-lg font-semibold text-blue-800'>DOCX generato</h3>
      <p className='text-sm text-blue-700'>
        Dimensione file: {(result.size / 1024).toFixed(2)} KB
      </p>
      <button
        type='button'
        onClick={download}
        className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
      >
        Scarica DOCX
      </button>
    </div>
  );
}

const definition = {
  id: 'pdf-to-word',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica il PDF',
      helperText: 'Converte il PDF in documento Word modificabile.',
      accept: '.pdf',
      multiple: false,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Converti in Word',
};

export default definition;


