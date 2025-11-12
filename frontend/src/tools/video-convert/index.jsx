// 🔧 File: frontend/src/tools/video-convert/index.jsx
// 🔗 NeoPanze — Conversione formati video con controlli qualità

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

  const metadata = result.metadata?.format;

  return (
    <div className='space-y-4'>
      <div className='text-sm text-slate-600'>
        <p>Formato: {result.format.toUpperCase()} • Bitrate video: {result.videoBitrate} kbps • Bitrate audio: {result.audioBitrate} kbps</p>
        <p>CRF: {result.crf} • Preset: {result.preset}</p>
        {metadata && (
          <p>
            Durata: {metadata.duration ? `${Number(metadata.duration).toFixed(2)}s` : 'n/d'} • Dimensione: {metadata.size ? `${(Number(metadata.size) / (1024 * 1024)).toFixed(2)} MB` : 'n/d'}
          </p>
        )}
      </div>
      {downloadHref && (
        <a
          href={downloadHref}
          download={result.outputFile.name}
          className='inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition'
        >
          Scarica video convertito
        </a>
      )}
    </div>
  );
}

const definition = {
  id: 'video-convert',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Video da convertire',
      helperText: 'MP4, MKV, MOV, AVI, WEBM',
      accept: 'video/*',
      required: true,
    },
    {
      type: 'select',
      name: 'format',
      label: 'Formato destinazione',
      defaultValue: 'mp4',
      options: [
        { value: 'mp4', label: 'MP4 (H.264 + AAC)' },
        { value: 'webm', label: 'WebM (VP9 + Opus)' },
        { value: 'mkv', label: 'MKV (H.264 + AAC)' },
        { value: 'avi', label: 'AVI (H.264 + AAC)' },
      ],
    },
    {
      type: 'number',
      name: 'videoBitrate',
      label: 'Bitrate video (kbps)',
      defaultValue: 3500,
      min: 500,
      max: 20000,
    },
    {
      type: 'number',
      name: 'audioBitrate',
      label: 'Bitrate audio (kbps)',
      defaultValue: 192,
      min: 64,
      max: 512,
    },
    {
      type: 'number',
      name: 'crf',
      label: 'CRF (qualità)',
      defaultValue: 23,
      min: 18,
      max: 32,
      helperText: 'Più basso = migliore qualità (e file più grande)',
    },
    {
      type: 'select',
      name: 'preset',
      label: 'Preset encoder',
      defaultValue: 'medium',
      options: [
        { value: 'ultrafast', label: 'Ultrafast' },
        { value: 'superfast', label: 'Superfast' },
        { value: 'veryfast', label: 'Veryfast' },
        { value: 'faster', label: 'Faster' },
        { value: 'fast', label: 'Fast' },
        { value: 'medium', label: 'Medium (default)' },
        { value: 'slow', label: 'Slow' },
        { value: 'slower', label: 'Slower' },
      ],
    },
  ],
  ResultView,
  ctaLabel: 'Converti video',
};

export default definition;

