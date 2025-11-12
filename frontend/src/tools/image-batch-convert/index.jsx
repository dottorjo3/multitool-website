// 🔧 File: frontend/src/tools/image-batch-convert/index.jsx
// 🔗 NeoPanze — Conversione batch immagini con archivio ZIP

import React, { useMemo } from 'react';

function useDownloadLink(result) {
  return useMemo(() => {
    if (!result?.archive?.base64) {
      return null;
    }
    return `data:${result.archive.mimeType};base64,${result.archive.base64}`;
  }, [result]);
}

function ResultView({ result }) {
  const downloadHref = useDownloadLink(result);

  if (!result?.archive) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>
        File convertiti: {result.convertedCount} • Formato finale: {result.format.toUpperCase()} • Archivio: {result.archive.name}
      </p>
      {downloadHref && (
        <a
          href={downloadHref}
          download={result.archive.name}
          className='inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition'
        >
          Scarica ZIP
        </a>
      )}
    </div>
  );
}

const definition = {
  id: 'image-batch-convert',
  fields: [
    {
      type: 'file',
      name: 'files',
      label: 'Immagini da convertire',
      helperText: 'Seleziona uno o più file (jpeg, png, webp, avif, tiff)',
      accept: 'image/*',
      multiple: true,
      required: true,
    },
    {
      type: 'select',
      name: 'format',
      label: 'Formato di destinazione',
      defaultValue: 'jpeg',
      options: [
        { value: 'jpeg', label: 'JPEG' },
        { value: 'jpg', label: 'JPG' },
        { value: 'png', label: 'PNG' },
        { value: 'webp', label: 'WebP' },
        { value: 'avif', label: 'AVIF' },
        { value: 'tiff', label: 'TIFF' },
      ],
    },
    {
      type: 'number',
      name: 'quality',
      label: 'Qualità (1-100)',
      defaultValue: 85,
      min: 1,
      max: 100,
    },
  ],
  ResultView,
  ctaLabel: 'Converti immagini',
};

export default definition;

