// 🔧 File: frontend/src/tools/video-split/index.jsx
// 🔗 NeoPanze — Divide video in segmenti

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
        Diviso in {result.segments || 0} segmenti da {result.segmentDuration || 0} secondi ciascuno • 
        Durata totale: {result.totalDuration ? `${Number(result.totalDuration).toFixed(1)}s` : 'N/A'}
      </p>
      <p className='text-xs text-slate-500'>
        I segmenti sono stati compressi in un file ZIP. Estrai per ottenere i singoli file.
      </p>
      {downloadHref && (
        <a
          href={downloadHref}
          download={result.outputFile.name}
          className='inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition'
        >
          Scarica ZIP con segmenti
        </a>
      )}
    </div>
  );
}

const definition = {
  id: 'video-split',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Video da dividere',
      helperText: 'Qualsiasi formato supportato da FFmpeg',
      accept: 'video/*',
      required: true,
    },
    {
      type: 'number',
      name: 'segmentDuration',
      label: 'Durata segmento (secondi)',
      defaultValue: 60,
      min: 1,
      max: 3600,
      helperText: 'Ogni segmento avrà questa durata (ultimo segmento può essere più corto)',
    },
  ],
  ResultView,
  ctaLabel: 'Dividi video',
};

export default definition;


