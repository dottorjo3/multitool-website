// 🔧 File: frontend/src/tools/image-rotate-flip/index.jsx
// 🔗 NeoPanze — Ruota e ribalta immagini con esportazione immediata

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
        Rotazione: {result.rotation}° • Flip orizzontale: {result.flipHorizontal ? 'Sì' : 'No'} • Flip verticale: {result.flipVertical ? 'Sì' : 'No'}
      </p>
      {downloadHref && (
        <>
          <a
            href={downloadHref}
            download={result.outputFile.name}
            className='inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition'
          >
            Scarica immagine
          </a>
          <img
            src={downloadHref}
            alt='Anteprima immagine ruotata'
            className='max-w-full rounded-lg border border-slate-200'
          />
        </>
      )}
    </div>
  );
}

const definition = {
  id: 'image-rotate-flip',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Immagine da ruotare/ribaltare',
      helperText: 'PNG, JPG, WebP, AVIF',
      accept: 'image/*',
      required: true,
    },
    {
      type: 'number',
      name: 'rotation',
      label: 'Angolo rotazione (°)',
      defaultValue: 0,
      min: -360,
      max: 360,
    },
    {
      type: 'checkbox',
      name: 'flipHorizontal',
      label: 'Ribalta orizzontalmente',
      defaultValue: 'false',
    },
    {
      type: 'checkbox',
      name: 'flipVertical',
      label: 'Ribalta verticalmente',
      defaultValue: 'false',
    },
    {
      type: 'select',
      name: 'format',
      label: 'Formato output',
      defaultValue: '',
      allowEmpty: true,
      options: [
        { value: '', label: 'Mantieni originale' },
        { value: 'jpeg', label: 'JPEG' },
        { value: 'jpg', label: 'JPG' },
        { value: 'png', label: 'PNG' },
        { value: 'webp', label: 'WebP' },
        { value: 'avif', label: 'AVIF' },
      ],
    },
    {
      type: 'number',
      name: 'quality',
      label: 'Qualità (1-100)',
      defaultValue: 90,
      min: 1,
      max: 100,
    },
  ],
  ResultView,
  ctaLabel: 'Applica trasformazioni',
};

export default definition;

