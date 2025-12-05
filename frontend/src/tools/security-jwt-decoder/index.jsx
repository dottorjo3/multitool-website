// 🔧 File: frontend/src/tools/security-jwt-decoder/index.jsx
// 🔗 NeoPanze — JWT Decoder

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>JWT Decodificato</p>
        <p className='text-sm text-indigo-700'>
          Algoritmo: <span className='font-mono'>{result.algorithm}</span>
        </p>
        {result.isExpired && (
          <p className='text-xs text-red-600 mt-1'>⚠ Token scaduto</p>
        )}
        {result.isNotYetValid && (
          <p className='text-xs text-amber-600 mt-1'>⚠ Token non ancora valido</p>
        )}
      </div>
      
      <div className='space-y-3'>
        <div>
          <p className='font-semibold text-slate-900 mb-2'>Header:</p>
          <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-48'>
            {JSON.stringify(result.header, null, 2)}
          </pre>
        </div>
        
        <div>
          <p className='font-semibold text-slate-900 mb-2'>Payload:</p>
          <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96'>
            {JSON.stringify(result.payload, null, 2)}
          </pre>
        </div>
        
        {(result.issuedAt || result.expiresAt) && (
          <div className='p-3 bg-slate-50 border border-slate-200 rounded-lg'>
            <p className='text-xs font-semibold text-slate-700 mb-1'>Informazioni:</p>
            {result.issuedAt && (
              <p className='text-xs text-slate-600'>Emesso il: {new Date(result.issuedAt).toLocaleString('it-IT')}</p>
            )}
            {result.expiresAt && (
              <p className='text-xs text-slate-600'>Scade il: {new Date(result.expiresAt).toLocaleString('it-IT')}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const definition = {
  id: 'security-jwt-decoder',
  fields: [
    {
      type: 'textarea',
      name: 'token',
      label: 'JWT Token',
      placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      rows: 5,
      required: true,
      helperText: 'Incolla un JWT token completo',
    },
  ],
  ResultView,
  ctaLabel: 'Decodifica JWT',
};

export default definition;


