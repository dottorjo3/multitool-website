// 🔧 File: frontend/src/tools/video-extract-audio/index.jsx
// 🔗 NeoPanze — Estrai traccia audio da un video

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
        Formato: {result.format.toUpperCase()} • Bitrate: {result.audioBitrate} kbps
      </p>
      {downloadHref && (
        <a
          href={downloadHref}
          download={result.outputFile.name}
          className='inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition'
        >
          Scarica audio
        </a>
      )}
    </div>
  );
}

const definition = {
  id: 'video-extract-audio',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Video sorgente',
      helperText: 'MP4, MKV, MOV, AVI, WebM nativi',
      accept: 'video/*',
      required: true,
    },
    {
      type: 'select',
      name: 'format',
      label: 'Formato audio',
      defaultValue: 'mp3',
      options: [
        { value: 'mp3', label: 'MP3 (compatibile)' },
        { value: 'wav', label: 'WAV (senza perdita)' },
        { value: 'aac', label: 'AAC' },
        { value: 'flac', label: 'FLAC (lossless)' },
      ],
    },
    {
      type: 'number',
      name: 'audioBitrate',
      label: 'Bitrate audio (kbps)',
      defaultValue: 192,
      min: 64,
      max: 512,
    },
  ],
  ResultView,
  ctaLabel: 'Estrai audio',
};

export default definition;

