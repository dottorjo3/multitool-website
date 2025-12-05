// 🔧 File: frontend/src/tools/audio-trim/index.jsx
// 🔗 NeoPanze — Taglia audio

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
        Taglio effettuato • Start: {result.start || 'dall\'inizio'} • End: {result.end || 'N/A'}
      </p>
      {downloadHref && (
        <a
          href={downloadHref}
          download={result.outputFile.name}
          className='inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition'
        >
          Scarica audio tagliato
        </a>
      )}
    </div>
  );
}

const definition = {
  id: 'audio-trim',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'File audio',
      helperText: 'Qualsiasi formato supportato da FFmpeg',
      accept: 'audio/*',
      required: true,
    },
    {
      type: 'text',
      name: 'start',
      label: 'Inizio (HH:MM:SS)',
      defaultValue: '00:00:00',
      placeholder: 'Es. 00:00:05 o 5.5',
      helperText: 'Accetta secondi (5.5) o HH:MM:SS',
    },
    {
      type: 'text',
      name: 'end',
      label: 'Fine (HH:MM:SS) - opzionale',
      placeholder: 'Es. 00:01:30 o 90.5',
      helperText: 'Lascia vuoto se usi duration',
    },
    {
      type: 'text',
      name: 'duration',
      label: 'Durata (secondi) - opzionale',
      placeholder: 'Es. 60 o 00:01:00',
      helperText: 'Usa questo O end (non entrambi)',
    },
  ],
  ResultView,
  ctaLabel: 'Taglia audio',
};

export default definition;


