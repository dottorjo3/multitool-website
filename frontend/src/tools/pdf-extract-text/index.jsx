// 🔧 File: frontend/src/tools/pdf-extract-text/index.jsx
// 🔗 Farm Ready — configurazione frontend per PDF Extract Text

import React from 'react';

function ResultView({ result }) {
  if (!result?.text) {
    return null;
  }

  const download = () => {
    const blob = new Blob([result.text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'estrazione-testo.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className='space-y-3'>
      <div className='bg-purple-50 border border-purple-200 rounded-lg p-4'>
        <h3 className='text-lg font-semibold text-purple-800'>Testo estratto</h3>
        <p className='text-sm text-purple-700 mb-2'>
          Caratteri totali: {result.length}
        </p>
        <pre className='max-h-64 overflow-auto text-sm whitespace-pre-wrap break-words text-gray-800'>
          {result.text}
        </pre>
      </div>
      <button
        type='button'
        onClick={download}
        className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700'
      >
        Scarica testo
      </button>
    </div>
  );
}

const definition = {
  id: 'pdf-extract-text',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica il PDF da analizzare',
      helperText: 'Il testo estratto verrà mostrato e potrai scaricarlo come TXT.',
      accept: '.pdf',
      multiple: false,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Estrai testo',
};

export default definition;

