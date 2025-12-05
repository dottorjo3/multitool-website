// 🔧 File: frontend/src/tools/video-caption-translator/index.jsx
// 🔗 Caption Translator

import React from 'react';

function ResultView({ result }) {
  if (!result?.outputFile) {
    return null;
  }

  const download = () => {
    const link = document.createElement('a');
    link.href = `data:${result.outputFile.mimeType};base64,${result.outputFile.base64}`;
    link.download = result.outputFile.name;
    link.click();
  };

  return (
    <div className='bg-sky-50 border border-sky-200 rounded-lg p-4 space-y-2'>
      <h3 className='text-lg font-semibold text-sky-800'>File processato con successo</h3>
      <button
        type='button'
        onClick={download}
        className='px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700'
      >
        Scarica file
      </button>
    </div>
  );
}

const definition = {
  id: 'video-caption-translator',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica file',
      accept: '.mp4,.avi,.mov,.mkv,.webm',
      multiple: false,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Processa',
};

export default definition;
