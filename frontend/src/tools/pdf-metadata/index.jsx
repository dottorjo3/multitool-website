// 🔧 File: frontend/src/tools/pdf-metadata/index.jsx
// 🔗 Farm Ready — configurazione frontend per PDF Metadata

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  if (result.mode === 'view') {
    return (
      <div className='bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3'>
        <h3 className='text-lg font-semibold text-slate-800'>Metadati rilevati</h3>
        <pre className='text-sm text-slate-700 whitespace-pre-wrap break-all bg-white p-3 rounded-lg shadow max-h-96 overflow-auto'>
          {JSON.stringify(result.metadata, null, 2)}
        </pre>
        <details className='text-sm text-slate-600'>
          <summary className='cursor-pointer select-none'>Mostra info raw</summary>
          <pre className='mt-2 bg-white p-3 rounded-lg shadow max-h-96 overflow-auto'>
            {JSON.stringify(result.raw, null, 2)}
          </pre>
        </details>
      </div>
    );
  }

  const download = () => {
    const link = document.createElement('a');
    link.href = `data:${result.outputFile.mimeType};base64,${result.outputFile.base64}`;
    link.download = result.outputFile.name;
    link.click();
  };

  return (
    <div className='bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-3'>
      <h3 className='text-lg font-semibold text-emerald-800'>Metadati rimossi</h3>
      <p className='text-sm text-emerald-700'>
        Verifica il risultato confrontando i dati prima/dopo.
      </p>
      <details className='text-sm text-emerald-700'>
        <summary className='cursor-pointer select-none'>Prima</summary>
        <pre className='mt-2 bg-white p-3 rounded-lg shadow max-h-96 overflow-auto'>
          {JSON.stringify(result.metadataBefore, null, 2)}
        </pre>
      </details>
      <details className='text-sm text-emerald-700'>
        <summary className='cursor-pointer select-none'>Dopo</summary>
        <pre className='mt-2 bg-white p-3 rounded-lg shadow max-h-96 overflow-auto'>
          {JSON.stringify(result.metadataAfter, null, 2)}
        </pre>
      </details>
      <button
        type='button'
        onClick={download}
        className='px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700'
      >
        Scarica PDF pulito
      </button>
    </div>
  );
}

const definition = {
  id: 'pdf-metadata',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica il PDF',
      helperText: 'Puoi solo visualizzare i metadati oppure rimuoverli completamente.',
      accept: '.pdf',
      multiple: false,
      required: true,
    },
    {
      type: 'text',
      name: 'mode',
      label: 'Modalità (view/clean)',
      defaultValue: 'view',
      helperText: 'Imposta "clean" per rimuovere i metadati.',
    },
  ],
  ResultView,
  ctaLabel: 'Analizza metadati',
};

export default definition;


