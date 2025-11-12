import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toolsAPI } from '../services/api';
import ToolRunner from '../components/ToolRunner';
import { loadToolDefinition } from '../tools';
import PremiumWall from '../components/PremiumWall';

export default function ToolPage() {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [tool, setTool] = useState(null);
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch (err) {
      console.error('Errore parsing user storage:', err);
      return null;
    }
  });

  const loadTool = useCallback(async () => {
    try {
      setLoading(true);
      const data = await toolsAPI.getById(toolId);
      const def = await loadToolDefinition(toolId);
      setTool(data);
      setDefinition(def);
      setError(null);
    } catch (err) {
      setError(err.message || 'Tool not found');
      console.error('Error loading tool:', err);
    } finally {
      setLoading(false);
    }
  }, [toolId]);

  useEffect(() => {
    loadTool();
  }, [loadTool]);

  useEffect(() => {
    const handleStorage = () => {
      try {
        const stored = localStorage.getItem('user');
        setCurrentUser(stored ? JSON.parse(stored) : null);
      } catch (err) {
        console.error('Errore aggiornamento user da storage:', err);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600'></div>
          <p className='mt-4 text-gray-600'>{t('tools.loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !tool || !definition) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>{t('tool.notFound')}</h2>
          <p className='text-gray-600 mb-6'>{error || t('tool.notFoundDesc')}</p>
          <button
            onClick={() => navigate('/tools')}
            className='px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700'
          >
            {t('tool.backToTools')}
          </button>
        </div>
      </div>
    );
  }

  const requiresPremium = tool ? tool.free === false : false;
  const isLocked = requiresPremium && !currentUser?.premium;

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto px-4 py-8 max-w-4xl'>
        {/* Tool header */}
        <div className='mb-6'>
          <button
            onClick={() => navigate('/tools')}
            className='text-indigo-600 hover:text-indigo-700 mb-4 inline-flex items-center'
          >
            {t('tool.backToTools')}
          </button>
          <h1 className='text-4xl font-bold mb-2'>{tool.name}</h1>
          <p className='text-gray-600 text-lg'>{tool.description}</p>
          <div className='mt-4 flex gap-2'>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              tool.category === 'pdf' ? 'bg-blue-100 text-blue-800' :
              tool.category === 'image' ? 'bg-green-100 text-green-800' :
              tool.category === 'text' ? 'bg-purple-100 text-purple-800' :
              tool.category === 'developer' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {t(`categories.${tool.category}`)}
            </span>
            {!tool.free && (
              <span className='px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium'>
                {t('tools.premium')}
              </span>
            )}
            {tool.free && (
              <span className='px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium'>
                {t('tools.free')}
              </span>
            )}
          </div>
        </div>

        {/* Tool runner */}
        {isLocked ? (
          <PremiumWall user={currentUser} />
        ) : (
          <ToolRunner definition={definition} toolMeta={tool} />
        )}
      </div>
    </div>
  );
}
