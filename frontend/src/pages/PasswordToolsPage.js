import React from 'react';
import { Link } from 'react-router-dom';

export default function PasswordToolsPage() {
  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>Password Tools</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <Link to='/tools' className='bg-white p-6 rounded-xl shadow hover:shadow-lg transition'>Torna ai Tools</Link>
      </div>
    </div>
  );
}









