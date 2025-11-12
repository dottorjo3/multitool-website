// 🔧 File: frontend/src/tools/video-compress/index.jsx
// 🔗 NeoPanze — Comprimi video impostando bitrate e risoluzione

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
        <p>
          Bitrate video: {result.videoBitrate} kbps • Bitrate audio: {result?.metadata?.streams?.find((s) => s.codec_type === 'audio')?.bit_rate
            ? `${Math.round(Number(result.metadata.streams.find((s) => s.codec_type === 'audio').bit_rate) / 1000)} kbps`
            : 'n/d'}
        </p>
        <p>
          CRF: {result.crf} • Preset: {result.preset} • Risoluzione target: {result.targetWidth || 'auto'} × {result.targetHeight || 'auto'}
        </p>
        {metadata && (
          <p>
            Dimensione stimata: {metadata.size ? `${(Number(metadata.size) / (1024 * 1024)).toFixed(2)} MB` : 'n/d'} • Durata: {metadata.duration ? `${Number(metadata.duration).toFixed(2)}s` : 'n/d'}
          </p>
        )}
      </div>
      {downloadHref && (
        <a
          href={downloadHref}
          download={result.outputFile.name}
          className='inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition'
        >
          Scarica video compresso
        </a>
      )}
    </div>
  );
}

const definition = {
  id: 'video-compress',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Video da comprimere',
      helperText: 'MP4, MOV, MKV raccomandati',
      accept: 'video/*',
      required: true,
    },
    {
      type: 'number',
      name: 'videoBitrate',
      label: 'Bitrate video target (kbps)',
      defaultValue: 2500,
      min: 400,
      max: 15000,
    },
    {
      type: 'number',
      name: 'audioBitrate',
      label: 'Bitrate audio target (kbps)',
      defaultValue: 128,
      min: 64,
      max: 512,
    },
    {
      type: 'number',
      name: 'crf',
      label: 'CRF (qualità)',
      defaultValue: 24,
      min: 18,
      max: 35,
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
        { value: 'medium', label: 'Medium' },
        { value: 'slow', label: 'Slow' },
        { value: 'slower', label: 'Slower' },
      ],
    },
    {
      type: 'number',
      name: 'width',
      label: 'Larghezza (px)',
      min: 160,
      max: 3840,
      helperText: 'Lascia vuoto per mantenere larghezza originale',
    },
    {
      type: 'number',
      name: 'height',
      label: 'Altezza (px)',
      min: 90,
      max: 2160,
      helperText: 'Lascia vuoto per mantenere altezza originale',
    },
  ],
  ResultView,
  ctaLabel: 'Comprimi video',
};

export default definition;

