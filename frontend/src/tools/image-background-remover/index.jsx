// 🔧 File: frontend/src/tools/image-background-remover/index.jsx
// 🔗 NeoPanze — Rimuove colori di sfondo tramite trasparenza

import React, { useMemo } from 'react';

function useDownloadLink(result) {
  return useMemo(() => {
    if (!result?.outputFile?.base64) {
      return null;
    }
    return `data:${result.outputFile.mimeType};base64,${result.outputFile.base64}`;
  }, [result]);
}

function ResultView({ result }) {
  const downloadHref = useDownloadLink(result);

  if (!result?.outputFile) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>
        Sfondo rimosso con tolleranza {result.tolerance} e colore {result.backgroundColor}
      </p>
      <div className='flex items-center gap-3'>
        {downloadHref && (
          <a
            href={downloadHref}
            download={result.outputFile.name}
            className='inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition'
          >
            Scarica PNG trasparente
          </a>
        )}
      </div>
      <img
        src={downloadHref}
        alt='Anteprima sfondo rimosso'
        className='max-w-full rounded-lg border border-slate-200'
      />
    </div>
  );
}

const definition = {
  id: 'image-background-remover',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Immagine da elaborare',
      helperText: 'PNG, JPG, WebP, AVIF',
      accept: 'image/*',
      required: true,
    },
    {
      type: 'text',
      name: 'backgroundColor',
      label: 'Colore da rendere trasparente',
      defaultValue: '#FFFFFF',
      helperText: 'Formato esadecimale (es. #FFFFFF per bianco)',
    },
    {
      type: 'number',
      name: 'tolerance',
      label: 'Tolleranza colore (0-255)',
      defaultValue: 35,
      min: 0,
      max: 255,
      helperText: 'Aumenta per rimuovere tonalità simili',
    },
  ],
  ResultView,
  ctaLabel: 'Rimuovi sfondo',
};

export default definition;

