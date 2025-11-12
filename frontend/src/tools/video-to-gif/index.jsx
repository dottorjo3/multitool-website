// 🔧 File: frontend/src/tools/video-to-gif/index.jsx
// 🔗 NeoPanze — Trasforma video in GIF animate

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
        GIF generata • FPS: {result.fps} • Larghezza: {result.width || 'auto'} px
      </p>
      {downloadHref && (
        <>
          <a
            href={downloadHref}
            download={result.outputFile.name}
            className='inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition'
          >
            Scarica GIF
          </a>
          <img
            src={downloadHref}
            alt='GIF generata'
            className='max-w-full rounded-lg border border-slate-200'
          />
        </>
      )}
    </div>
  );
}

const definition = {
  id: 'video-to-gif',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Video sorgente',
      helperText: 'Supporta MP4, MOV, MKV, AVI, WebM',
      accept: 'video/*',
      required: true,
    },
    {
      type: 'number',
      name: 'fps',
      label: 'Fotogrammi al secondo',
      defaultValue: 12,
      min: 1,
      max: 30,
    },
    {
      type: 'number',
      name: 'width',
      label: 'Larghezza output (px)',
      placeholder: 'Es. 480',
      min: 16,
      max: 1920,
      helperText: 'Lascia vuoto per mantenere proporzioni automatiche',
    },
    {
      type: 'text',
      name: 'start',
      label: 'Inizio (s o HH:MM:SS)',
      placeholder: 'Es. 5 o 00:00:05',
    },
    {
      type: 'text',
      name: 'duration',
      label: 'Durata clip (secondi)',
      placeholder: 'Es. 3.5',
    },
  ],
  ResultView,
  ctaLabel: 'Genera GIF',
};

export default definition;

