// 🔧 File: frontend/src/tools/image-qr-generator/index.jsx
// 🔗 NeoPanze — QR Code Generator

import React from 'react';

function downloadBase64({ base64, name, mimeType }) {
  const link = document.createElement('a');
  link.href = `data:${mimeType};base64,${base64}`;
  link.download = name;
  link.click();
}

function ResultView({ result }) {
  if (!result?.outputFile) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
        <h3 className='text-lg font-semibold text-green-800 mb-2'>QR Code generato</h3>
        <p className='text-sm text-green-700'>
          Testo: {result.text} • Dimensione: {result.size}x{result.size}px
        </p>
      </div>
      <div className='flex justify-center'>
        <img
          src={`data:${result.outputFile.mimeType};base64,${result.outputFile.base64}`}
          alt='QR Code'
          className='border-4 border-slate-200 rounded-lg'
          style={{ width: '300px', height: '300px' }}
        />
      </div>
      <button
        type='button'
        onClick={() => downloadBase64(result.outputFile)}
        className='w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700'
      >
        Scarica QR Code
      </button>
    </div>
  );
}

const definition = {
  id: 'image-qr-generator',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo o URL',
      placeholder: 'https://example.com o qualsiasi testo',
      required: true,
      rows: 3,
    },
    {
      type: 'number',
      name: 'size',
      label: 'Dimensione (px)',
      defaultValue: 500,
      min: 100,
      max: 2000,
    },
  ],
  ResultView,
  ctaLabel: 'Genera QR Code',
};

export default definition;


