import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import ToolsPage from './pages/ToolsPage';
import Login from './pages/Login';
import ToolPage from './pages/ToolPage';
import PdfToolsPage from './pages/PdfToolsPage';
import ImageToolsPage from './pages/ImageToolsPage';
import TextToolsPage from './pages/TextToolsPage';
import PasswordToolsPage from './pages/PasswordToolsPage';
import VideoToolsPage from './pages/VideoToolsPage';
import AiToolsPage from './pages/AiToolsPage';
import MarketingToolsPage from './pages/MarketingToolsPage';
import './App.css';

// 🧠 Layout aggiornato: main full-width per supportare sezioni hero NeoPanze

function App() {
  const { t } = useTranslation();

  return (
    <ErrorBoundary>
      <Router>
        <div className='App min-h-screen bg-slate-50 text-slate-900 flex flex-col'>
          <Navbar />
          <main className='flex-grow'>
            <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/tools' element={<ToolsPage />} />
            <Route path='/tool/:toolId' element={<ToolPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/pdf-tools' element={<PdfToolsPage />} />
            <Route path='/image-tools' element={<ImageToolsPage />} />
            <Route path='/text-tools' element={<TextToolsPage />} />
            <Route path='/password-tools' element={<PasswordToolsPage />} />
            <Route path='/video-tools' element={<VideoToolsPage />} />
            <Route path='/ai-tools' element={<AiToolsPage />} />
            <Route path='/marketing-tools' element={<MarketingToolsPage />} />
          </Routes>
        </main>
        <footer className='border-t border-slate-200 bg-white py-10'>
          <div className='container mx-auto px-4 text-center text-sm text-slate-500'>
            <p>{t('footer.text')}</p>
            <p className='mt-2 text-xs text-slate-400'>{t('footer.subtext')}</p>
          </div>
        </footer>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
