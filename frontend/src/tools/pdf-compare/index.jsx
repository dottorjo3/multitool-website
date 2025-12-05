// 🔧 File: frontend/src/tools/pdf-compare/index.jsx
// 🔗 NeoPanze — Confronta due PDF

import React from 'react';

function downloadBase64({ base64, name, mimeType }) {
  const link = document.createElement('a');
  link.href = `data:${mimeType};base64,${base64}`;
  link.download = name;
  link.click();
}

function ResultView({ result }) {
  if (!result?.differences) {
    return null;
  }

  const { differences } = result;
  const pageCountSame = differences.pageCount?.same;
  const textLengthSame = differences.textLength?.same;
  const metadataSame = differences.metadata?.same;

  return (
    <div className='space-y-4'>
      <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
        <h3 className='text-lg font-semibold text-blue-800 mb-3'>Risultati Confronto</h3>
        <div className='space-y-2 text-sm'>
          <div className='flex justify-between'>
            <span className='font-medium'>File 1:</span>
            <span>{differences.fileNames?.[0]}</span>
          </div>
          <div className='flex justify-between'>
            <span className='font-medium'>File 2:</span>
            <span>{differences.fileNames?.[1]}</span>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className={`p-4 rounded-lg border ${pageCountSame ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
          <div className='font-semibold mb-1'>Pagine</div>
          <div className='text-sm'>
            File 1: {differences.pageCount?.file1 || 'N/A'}<br />
            File 2: {differences.pageCount?.file2 || 'N/A'}
          </div>
          {pageCountSame ? (
            <span className='text-xs text-green-600'>✓ Stesso numero</span>
          ) : (
            <span className='text-xs text-yellow-600'>⚠ Diverso</span>
          )}
        </div>

        <div className={`p-4 rounded-lg border ${textLengthSame ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
          <div className='font-semibold mb-1'>Testo</div>
          <div className='text-sm'>
            File 1: {differences.textLength?.file1 || 'N/A'} caratteri<br />
            File 2: {differences.textLength?.file2 || 'N/A'} caratteri
          </div>
          {textLengthSame ? (
            <span className='text-xs text-green-600'>✓ Stessa lunghezza</span>
          ) : (
            <span className='text-xs text-yellow-600'>⚠ Diversa</span>
          )}
        </div>

        <div className={`p-4 rounded-lg border ${metadataSame ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
          <div className='font-semibold mb-1'>Metadata</div>
          <div className='text-sm'>
            File 1: {differences.fileSize?.file1 ? `${(differences.fileSize.file1 / 1024).toFixed(2)} KB` : 'N/A'}<br />
            File 2: {differences.fileSize?.file2 ? `${(differences.fileSize.file2 / 1024).toFixed(2)} KB` : 'N/A'}
          </div>
          {metadataSame ? (
            <span className='text-xs text-green-600'>✓ Stesso formato</span>
          ) : (
            <span className='text-xs text-yellow-600'>⚠ Diverso</span>
          )}
        </div>
      </div>

      {result.summary && (
        <div className='text-sm text-slate-600 bg-slate-50 p-3 rounded'>
          <strong>Riepilogo:</strong> {result.summary}
        </div>
      )}
    </div>
  );
}

const definition = {
  id: 'pdf-compare',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica due PDF da confrontare',
      helperText: 'Seleziona esattamente 2 file PDF (max 200 MB ciascuno).',
      accept: '.pdf',
      multiple: true,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Confronta PDF',
};

export default definition;
