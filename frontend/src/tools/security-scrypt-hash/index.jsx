// 🔧 File: frontend/src/tools/security-scrypt-hash/index.jsx
// 🔗 Scrypt Hash

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
  id: 'security-scrypt-hash',
  fields: [
  {
    "type": "text",
    "name": "password",
    "label": "Password",
    "placeholder": "Inserisci la password...",
    "required": true
  },
  {
    "type": "number",
    "name": "saltRounds",
    "label": "Salt rounds",
    "defaultValue": 10,
    "min": 4,
    "max": 15,
    "helperText": "Numero di round (4-15 per bcrypt, 1000-100000 per pbkdf2/scrypt)"
  }
],
  ResultView,
  ctaLabel: 'Calcola hash',
};

export default definition;
