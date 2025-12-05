// 🔧 File: frontend/src/tools/security-hmac-file/index.jsx
// 🔗 HMAC File

import React from 'react';

function ResultView({ result }) {
  if (!result) return null;

  return (
    <div className='space-y-4'>
      <div className='p-4 bg-white border border-slate-200 rounded-lg'>
        <pre className='text-sm whitespace-pre-wrap break-all font-mono'>
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
      {result.note && (
        <div className='p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm'>
          {result.note}
        </div>
      )}
    </div>
  );
}

const definition = {
  id: 'security-hmac-file',
  fields: [
  {
    "type": "text",
    "name": "secret",
    "label": "Secret Key",
    "placeholder": "Inserisci la chiave segreta...",
    "required": true
  },
  {
    "type": "select",
    "name": "algorithm",
    "label": "Algoritmo",
    "defaultValue": "sha256",
    "options": [
      {
        "value": "md5",
        "label": "MD5"
      },
      {
        "value": "sha1",
        "label": "SHA1"
      },
      {
        "value": "sha256",
        "label": "SHA256"
      },
      {
        "value": "sha512",
        "label": "SHA512"
      }
    ]
  }
],
  ResultView,
  ctaLabel: 'Esegui',
};

export default definition;
