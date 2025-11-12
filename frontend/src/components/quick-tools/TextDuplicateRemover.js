import React, { useState } from 'react';
export default function TextDuplicateRemover() {
  const [output, setOutput] = useState('');
  return (
    <div className='bg-white p-6 rounded-xl shadow-md text-center'>
      <h2 className='text-xl font-semibold mb-4'>TextDuplicateRemover</h2>
      <textarea className='w-full border rounded p-2 mb-4' rows='4' placeholder='Inserisci dati...'></textarea>
      <button onClick={()=>setOutput('Funziona ?')} className='bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700'>Esegui</button>
      <p className='mt-4 text-gray-700'>{output}</p>
    </div>
  );
}









