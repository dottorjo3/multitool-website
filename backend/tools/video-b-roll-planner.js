// Tool: Video B-Roll Planner
// Suggests B-roll shots based on primary script segments with timing and cues.

module.exports = {
  async run({ params }) {
    const durationMinutes = Number(params?.durationMinutes) || 5;
    const scriptSegments = Number(params?.scriptSegments) || 6;
    const tone = params?.tone || 'professional';

    const segments = Array.from({ length: scriptSegments }).map((_, index) => ({
      segment: index + 1,
      timing: `${Math.round((durationMinutes * 60 / scriptSegments) * index)}s`,
      prompt: `Suggest B-roll ideas for segment ${index + 1} of a ${tone} video.`,
      fields: ['visualIdea', 'location', 'motion', 'notes'],
    }));

    const checklist = [
      'Assicurati che il B-roll supporti la storytelling senza distrarre.',
      'Mantieni coerenza cromatica e brand.',
      'Prevedi varianti (wide, medium, close) per editing dinamico.',
    ];

    return {
      summary: `B-roll planner ${tone} per video ${durationMinutes} minuti.`,
      durationMinutes,
      scriptSegments,
      tone,
      segments,
      checklist,
      automation: [
        'Invia prompt a AI image/video generator per ottenere reference.',
        'Crea storyboard B-roll integrato con timeline principale.',
        'Aggiorna library shot list condivisa con team video.',
      ],
    };
  },
};

// Tool: Video B-Roll Planner
// Generates a blueprint for B-Roll selection and insertion in video editing.

module.exports = {
  async run({ params }) {
    const primaryTheme = params?.primaryTheme || 'product demo';
    const durationMinutes = Number(params?.durationMinutes) || 5;
    const includeShotList = Boolean(params?.includeShotList);

    const timeline = [
      'Segmenta timeline in blocchi (intro, body, CTA).',
      'Identifica momenti chiave da arricchire con B-Roll (transizioni, highlight).',
      'Stima durata B-Roll necessario (es. 30% del video).',
      'Prepara overlay testuale o callout quando necessario.',
    ];

    const shotIdeas = includeShotList
      ? [
          { type: 'Close-up', description: 'Dettaglio prodotto in uso', duration: '3-4s' },
          { type: 'Wide shot', description: 'Utente nel contesto', duration: '4-5s' },
          { type: 'Macro', description: 'Dettaglio funzionalità / UI', duration: '2-3s' },
          { type: 'Reaction', description: 'Customer testimonial, sorrisi, gesto', duration: '3s' },
        ]
      : [];

    const sourcing = [
      'Utilizza librerie interne o stock (Artgrid, Storyblocks, Pexels).',
      'Riprese custom: definisci script shot-by-shot, camera, lente, frame rate.',
      'Crea foglio di continuity per coerenza cromatica e lighting.',
    ];

    const integration = [
      'Inserisci marker B-Roll in timeline NLE (Resolve, Premiere).',
      'Sincronizza B-Roll con voiceover o beat musicale.',
      'Aggiungi transizioni o match cut per fluidità.',
      'Assicurati che B-Roll rispetti brand colors e moodboard.',
    ];

    return {
      summary: `B-Roll planner per ${primaryTheme} (~${durationMinutes} minuti).`,
      primaryTheme,
      durationMinutes,
      includeShotList,
      timeline,
      shotIdeas,
      sourcing,
      integration,
      qaChecklist: [
        'Verifica che B-Roll non copra contenuti cruciali del main shot.',
        'Controlla audio ambiente: riduci volume o sostituisci con musica/crossfade.',
        'Allinea color grading con footage principale.',
      ],
    };
  },
};


