import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolCard from '../components/ToolCard';
import { toolsAPI } from '../services/api';
import workflows from '../data/video_workflows.json';

export default function VideoToolsPage() {
  const { t } = useTranslation();
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    toolsAPI.getAll()
      .then((response) => {
        if (mounted) {
          setTools(response);
        }
      })
      .catch((error) => {
        console.error('Errore caricamento tool video:', error);
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const videoTools = useMemo(() => (tools ? tools.filter((tool) => tool.category === 'video') : []), [tools]);

  const metaById = {
    'video-extract-audio': {
      icon: '🎧',
      guideUrl: 'https://docs.tool-empire.dev/video/extract-audio',
      command: 'ffmpeg -i input.mp4 -vn -acodec copy output.m4a',
    },
    'video-compress': {
      icon: '📦',
      guideUrl: 'https://docs.tool-empire.dev/video/compress',
      command: 'ffmpeg -i input.mp4 -vcodec libx265 -crf 26 output.mp4',
    },
    'video-convert': {
      icon: '🔁',
      guideUrl: 'https://docs.tool-empire.dev/video/convert',
      command: 'ffmpeg -i input.mov -c:v libx264 -preset medium -c:a aac output.mp4',
    },
    'video-metadata': {
      icon: '🧾',
      guideUrl: 'https://docs.tool-empire.dev/video/metadata',
      command: 'ffprobe -show_streams -i input.mp4',
    },
    'video-thumbnail': {
      icon: '🖼️',
      guideUrl: 'https://docs.tool-empire.dev/video/thumbnail',
      command: 'ffmpeg -ss 00:00:05 -i input.mp4 -frames:v 1 thumb.jpg',
    },
    'video-to-gif': {
      icon: '✨',
      guideUrl: 'https://docs.tool-empire.dev/video/to-gif',
      command:
        'ffmpeg -i input.mp4 -vf "fps=12,scale=480:-1:flags=lanczos" -loop 0 output.gif',
    },
    'video-trim': {
      icon: '✂️',
      guideUrl: 'https://docs.tool-empire.dev/video/trim',
      command: 'ffmpeg -ss 15 -to 45 -i input.mp4 -c copy clip.mp4',
    },
  };

  const toolNameMap = useMemo(
    () => Object.fromEntries(videoTools.map((tool) => [tool.id, tool.name])),
    [videoTools],
  );

  const getActionsForTool = (toolId) => {
    const meta = metaById[toolId];
    if (!meta) return [];
    const actions = [];
    if (meta.guideUrl) {
      actions.push({
        key: 'guide',
        icon: '📘',
        label: t('videoLab.quickActions.guide'),
        ariaLabel: t('videoLab.quickActions.guide'),
        onClick: () => window.open(meta.guideUrl, '_blank', 'noopener,noreferrer'),
      });
    }
    if (meta.command) {
      actions.push({
        key: 'command',
        icon: '📋',
        label: t('videoLab.quickActions.copy'),
        ariaLabel: t('videoLab.quickActions.copyAria'),
        onClick: async () => {
          try {
            await navigator.clipboard.writeText(meta.command);
          } catch (error) {
            console.error('Clipboard error', error);
          }
        },
      });
    }
    return actions;
  };

  return (
    <div className='min-h-screen bg-slate-50'>
      <section className='bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white py-20'>
        <div className='container mx-auto flex max-w-4xl flex-col items-center px-4 text-center'>
          <div className='max-w-3xl'>
            <span className='mb-4 inline-flex items-center justify-center rounded-full border border-indigo-400/40 bg-indigo-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide'>
              🎬 {t('nav.videoSuite')}
            </span>
            <h1 className='mb-4 text-4xl font-bold tracking-tight sm:text-5xl'>
              {t('nav.videoSuite')} NeoPanze
            </h1>
            <p className='text-lg leading-relaxed text-indigo-100'>
              Converti, comprimi, estrai audio e genera GIF in pochi click. Tutti i tool sono ottimizzati per l'AI Farm e sfruttano FFmpeg per performance professionali.
            </p>
          </div>
        </div>
      </section>

      <section className='mx-auto max-w-6xl px-4 py-12'>
        {loading ? (
          <div className='py-20 text-center text-slate-500'>{t('tools.loading')}</div>
        ) : (
          <div className='grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3'>
            {videoTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                iconOverride={metaById[tool.id]?.icon}
                actions={getActionsForTool(tool.id)}
              />
            ))}
          </div>
        )}
      </section>

      <section className='bg-white py-16'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
            <div>
              <h2 className='text-2xl font-bold text-slate-900'>{t('videoLab.workflows.title')}</h2>
              <p className='text-sm text-slate-600'>{t('videoLab.workflows.subtitle')}</p>
            </div>
          </div>
          <div className='mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {workflows.map((flow) => (
              <div
                key={flow.id}
                className='flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm'
              >
                <div className='flex items-center justify-between gap-3'>
                  <h3 className='text-lg font-semibold text-slate-900'>{flow.title}</h3>
                  <span className='rounded-full bg-indigo-100 px-3 py-1 text-[11px] font-semibold text-indigo-700'>
                    {flow.duration}
                  </span>
                </div>
                <ul className='mt-4 space-y-2 text-sm text-slate-600'>
                  {flow.steps.map((step, index) => (
                    <li key={index} className='flex gap-2'>
                      <span className='mt-[2px] text-indigo-500'>•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
                <div className='mt-4 flex flex-wrap gap-2 text-[11px] font-semibold text-slate-500'>
                  {flow.tools.map((toolId) => (
                    <span key={toolId} className='rounded-full bg-white px-3 py-1 shadow-sm'>
                      {toolNameMap[toolId] || toolId}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

