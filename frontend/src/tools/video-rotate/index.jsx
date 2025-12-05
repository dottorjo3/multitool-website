// 🔧 File: frontend/src/tools/video-rotate/index.jsx
// 🔗 NeoPanze — Ruota video

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
        Video ruotato di {result.angle}°
      </p>
      {downloadHref && (
        <a
          href={downloadHref}
          download={result.outputFile.name}
          className='inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition'
        >
          Scarica video ruotato
        </a>
      )}
    </div>
  );
}

const definition = {
  id: 'video-rotate',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Video da ruotare',
      helperText: 'Qualsiasi formato supportato da FFmpeg',
      accept: 'video/*',
      required: true,
    },
    {
      type: 'select',
      name: 'angle',
      label: 'Angolo di rotazione',
      defaultValue: '90',
      options: [
        { value: '90', label: '90° (orario)' },
        { value: '180', label: '180° (capovolto)' },
        { value: '270', label: '270° (antiorario)' },
      ],
    },
  ],
  ResultView,
  ctaLabel: 'Ruota video',
};

export default definition;


