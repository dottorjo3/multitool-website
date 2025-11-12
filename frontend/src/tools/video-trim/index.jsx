// 🔧 File: frontend/src/tools/video-trim/index.jsx
// 🔗 NeoPanze — Taglia clip da un video con start/durata

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
        Clip estratta • Start: {result.start || 'dall\'inizio'} • Durata: {result.duration || 'fino alla fine'}
      </p>
      {downloadHref && (
        <a
          href={downloadHref}
          download={result.outputFile.name}
          className='inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition'
        >
          Scarica clip
        </a>
      )}
    </div>
  );
}

const definition = {
  id: 'video-trim',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Video sorgente',
      helperText: 'Qualsiasi formato supportato da FFmpeg',
      accept: 'video/*',
      required: true,
    },
    {
      type: 'text',
      name: 'start',
      label: 'Inizio clip',
      placeholder: 'Es. 00:00:05 o 5.5',
      helperText: 'Accetta secondi (5.5) o HH:MM:SS',
    },
    {
      type: 'text',
      name: 'duration',
      label: 'Durata clip',
      placeholder: 'Es. 10 o 00:00:10',
      helperText: 'Accetta secondi o HH:MM:SS. Lascia vuoto per fino alla fine',
    },
  ],
  ResultView,
  ctaLabel: 'Taglia clip',
};

export default definition;

