// 🔧 File: frontend/src/tools/text-highlighter/index.jsx
// 🔗 NeoPanze — Text Highlighter

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  const renderHighlighted = (text, type) => {
    switch (type) {
      case 'bold':
        return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => 
          part.startsWith('**') && part.endsWith('**') 
            ? <strong key={i} className='font-bold text-indigo-900'>{part.slice(2, -2)}</strong>
            : part
        );
      case 'italic':
        return text.split(/(\*[^*]+\*)/g).map((part, i) => 
          part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')
            ? <em key={i} className='italic text-indigo-900'>{part.slice(1, -1)}</em>
            : part
        );
      case 'underline':
        return text.split(/(__[^_]+__)/g).map((part, i) => 
          part.startsWith('__') && part.endsWith('__')
            ? <span key={i} className='underline text-indigo-900'>{part.slice(2, -2)}</span>
            : part
        );
      default:
        return text.split(/(==[^=]+==)/g).map((part, i) => 
          part.startsWith('==') && part.endsWith('==')
            ? <mark key={i} className='bg-yellow-200 text-indigo-900'>{part.slice(2, -2)}</mark>
            : part
        );
    }
  };

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>Testo evidenziato:</p>
        <div className='bg-white p-4 rounded border border-indigo-200'>
          <p className='text-slate-900 whitespace-pre-wrap break-words'>
            {renderHighlighted(result.highlighted, result.highlightType)}
          </p>
        </div>
        <div className='mt-3 text-xs text-indigo-700'>
          <p>Parole evidenziate: <span className='font-semibold'>{result.keywords.join(', ')}</span></p>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-highlighter',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da evidenziare',
      placeholder: 'Inserisci il testo...',
      rows: 8,
      required: true,
    },
    {
      type: 'text',
      name: 'keywords',
      label: 'Parole da evidenziare',
      placeholder: 'parola1, parola2, frase...',
      required: true,
    },
    {
      type: 'select',
      name: 'highlightType',
      label: 'Tipo di evidenziazione',
      options: [
        { value: 'mark', label: 'Evidenziazione (mark)' },
        { value: 'bold', label: 'Grassetto' },
        { value: 'italic', label: 'Corsivo' },
        { value: 'underline', label: 'Sottolineato' },
      ],
      defaultValue: 'mark',
    },
    {
      type: 'checkbox',
      name: 'caseSensitive',
      label: 'Case sensitive',
      defaultValue: 'false',
    },
  ],
  ResultView,
  ctaLabel: 'Evidenzia',
};

export default definition;

