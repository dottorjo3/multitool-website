// 🔧 File: frontend/src/tools/pdf-to-excel/index.jsx
// 🔗 Farm Ready — configurazione frontend per PDF to Excel (XLSX)

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
    <div className='bg-lime-50 border border-lime-200 rounded-lg p-4 space-y-3'>
      <h3 className='text-lg font-semibold text-lime-800'>XLSX generato</h3>
      <p className='text-sm text-lime-700'>
        Dimensione file: {(result.size / 1024).toFixed(2)} KB
      </p>
      <button
        type='button'
        onClick={download}
        className='px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700'
      >
        Scarica XLSX
      </button>
    </div>
  );
}

const definition = {
  id: 'pdf-to-excel',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica il PDF',
      helperText: 'Converte il PDF in foglio Excel (XLSX)',
      accept: '.pdf',
      multiple: false,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Converti in Excel',
};

export default definition;


