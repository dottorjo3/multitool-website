// 🔧 File: frontend/src/tools/image-batch-resize/index.jsx
// 🔗 NeoPanze — Ridimensiona immagini in batch con download ZIP

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
        File ridimensionati: {result.resizedCount} • Dimensioni: {result.width || 'auto'} × {result.height || 'auto'} • Fit: {result.fit}
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
  id: 'image-batch-resize',
  fields: [
    {
      type: 'file',
      name: 'files',
      label: 'Immagini da ridimensionare',
      helperText: 'Seleziona più immagini (jpeg, png, webp, avif, tiff)',
      accept: 'image/*',
      multiple: true,
      required: true,
    },
    {
      type: 'number',
      name: 'width',
      label: 'Larghezza (px)',
      placeholder: 'Es. 1080',
      min: 1,
      max: 10000,
    },
    {
      type: 'number',
      name: 'height',
      label: 'Altezza (px)',
      placeholder: 'Es. 1080',
      min: 1,
      max: 10000,
    },
    {
      type: 'select',
      name: 'fit',
      label: 'Fit ridimensionamento',
      defaultValue: 'cover',
      options: [
        { value: 'cover', label: 'Cover' },
        { value: 'contain', label: 'Contain' },
        { value: 'inside', label: 'Inside' },
        { value: 'outside', label: 'Outside' },
        { value: 'fill', label: 'Fill' },
      ],
    },
    {
      type: 'checkbox',
      name: 'withoutEnlargement',
      label: 'Evita ingrandimenti',
      helperText: 'Non aumenta immagini più piccole della dimensione target',
      defaultValue: 'true',
    },
    {
      type: 'select',
      name: 'format',
      label: 'Forza formato output (opzionale)',
      defaultValue: '',
      allowEmpty: true,
      options: [
        { value: '', label: 'Mantieni originale' },
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
  ctaLabel: 'Ridimensiona batch',
};

export default definition;

