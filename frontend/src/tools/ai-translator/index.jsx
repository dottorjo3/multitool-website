// 🔧 File: frontend/src/tools/ai-translator/index.jsx
// 🔗 NeoPanze — AI Translator

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.translated) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.translated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-4'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <div className='flex items-center justify-between mb-2'>
          <p className='text-sm text-indigo-600'>
            {result.fromLang} → {result.toLang}
          </p>
          <button
            type='button'
            onClick={handleCopy}
            className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
          >
            {copied ? 'Copiato!' : 'Copia'}
          </button>
        </div>
        <div className='bg-white p-4 rounded border'>
          <p className='text-slate-900 whitespace-pre-wrap'>{result.translated}</p>
        </div>
      </div>
      <div className='text-xs text-slate-500'>
        Originale: {result.length} caratteri • Tradotto: {result.translatedLength} caratteri
      </div>
    </div>
  );
}

const definition = {
  id: 'ai-translator',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo da tradurre',
      placeholder: 'Inserisci il testo da tradurre...',
      required: true,
      rows: 6,
    },
    {
      type: 'select',
      name: 'fromLang',
      label: 'Lingua origine',
      options: [
        { value: 'auto', label: 'Auto-rileva' },
        { value: 'it', label: 'Italiano' },
        { value: 'en', label: 'Inglese' },
        { value: 'es', label: 'Spagnolo' },
        { value: 'fr', label: 'Francese' },
        { value: 'de', label: 'Tedesco' },
      ],
      defaultValue: 'auto',
    },
    {
      type: 'select',
      name: 'toLang',
      label: 'Lingua destinazione',
      options: [
        { value: 'en', label: 'Inglese' },
        { value: 'it', label: 'Italiano' },
        { value: 'es', label: 'Spagnolo' },
        { value: 'fr', label: 'Francese' },
        { value: 'de', label: 'Tedesco' },
        { value: 'pt', label: 'Portoghese' },
        { value: 'ru', label: 'Russo' },
        { value: 'zh', label: 'Cinese' },
        { value: 'ja', label: 'Giapponese' },
      ],
      defaultValue: 'en',
    },
  ],
  ResultView,
  ctaLabel: 'Traduci',
};

export default definition;


