// 🔧 File: frontend/src/tools/pdf-add-bookmarks/index.jsx
// 🔗 NeoPanze — Add PDF Bookmarks

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
      <p className='font-semibold text-indigo-900 mb-2'>
        {result.bookmarksCount} segnalibri aggiunti
      </p>
    </div>
  );
}

const definition = {
  id: 'pdf-add-bookmarks',
  fields: [
    {
      type: 'textarea',
      name: 'bookmarks',
      label: 'Segnalibri (JSON)',
      placeholder: '[{"title": "Chapter 1", "page": 1}, {"title": "Chapter 2", "page": 5}]',
      required: true,
      rows: 6,
      helperText: 'Array JSON con title e page',
    },
  ],
  ResultView,
  ctaLabel: 'Aggiungi Segnalibri',
  acceptsFiles: true,
  maxFiles: 1,
  allowedMimeTypes: ['application/pdf'],
};

export default definition;


