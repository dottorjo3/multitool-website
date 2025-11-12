// Tool: Video Livestream Checklist
// Creates a technical and content checklist for livestream events.

module.exports = {
  async run({ params }) {
    const eventLengthMinutes = Number(params?.eventLengthMinutes) || 60;
    const platforms = Array.isArray(params?.platforms) && params.platforms.length > 0
      ? params.platforms
      : ['YouTube', 'LinkedIn'];
    const rehearsal = Boolean(params?.rehearsal);

    const checklist = {
      preLive: [
        'Test audio/video e connessione (upload >10 Mbps).',
        'Configura encoder (OBS/StreamYard) con bitrate adeguato.',
        'Imposta overlay, lower third e grafica brand.',
        'Carica agenda e materiali a supporto.',
      ],
      live: [
        'Monitor chat e moderazione.',
        'Segnala eventuali Q&A e timestamp.',
        'Fallback se connessione instabile (scena backup).',
      ],
      postLive: [
        'Scarica registrazione e genera highlight.',
        'Invia follow-up email / asset ai partecipanti.',
        'Analizza metriche (concurrent viewers, retention, CTR CTA).',
      ],
    };

    if (rehearsal) {
      checklist.preLive.unshift('Organizza rehearsal completo 24h prima con team completo.');
    }

    return {
      summary: `Livestream checklist (${eventLengthMinutes} minuti) per piattaforme ${platforms.join(', ')}.`,
      eventLengthMinutes,
      platforms,
      rehearsal,
      checklist,
      automation: [
        'Crea template Notion/Asana con checklist assegnata ai membri team.',
        'Integra alert Slack 30 minuti prima di go-live.',
        'Usa webhook per segnare start/stop in analytics dashboard.',
      ],
    };
  },
};

// Tool: Video Livestream Checklist
// Provides a checklist and workflow for livestream preparation and execution.

module.exports = {
  async run({ params }) {
    const platform = params?.platform || 'YouTube';
    const durationMinutes = Number(params?.durationMinutes) || 60;
    const teamSize = Number(params?.teamSize) || 4;

    const phases = [
      {
        phase: 'Pre-live (T-7 giorni)',
        items: [
          'Definisci scaletta e storyboard.',
          'Testa audio/video, encoder, connessione.',
          'Crea grafiche (lower thirds, intro, countdown).',
          'Programma stream sul canale e invia promozione.',
        ],
      },
      {
        phase: 'Live day',
        items: [
          'Setup luci e camera (white balance).',
          'Verifica scene OBS/Streamlabs e transizioni.',
          'Monitor chat/community e modera.',
          'Backup stream/registrazione locale.',
        ],
      },
      {
        phase: 'Post-live',
        items: [
          'Taglia in highlight e ripubblica.',
          'Invia follow-up email con CTA.',
          'Analizza analytics (peak viewers, retention).',
        ],
      },
    ];

    const teamRoles = [
      { role: 'Host', responsibility: 'Conduzione e interazione con pubblico.' },
      { role: 'Tech director', responsibility: 'Gestione OBS/encoder, audio, overlay.' },
      { role: 'Moderator', responsibility: 'Chat, Q&A, spam control.' },
      { role: 'Producer', responsibility: 'Timer, checklist, CTA timeline.' },
    ].slice(0, Math.max(1, teamSize));

    return {
      summary: `Checklist livestream per ${platform} (${durationMinutes} min, team ${teamSize}).`,
      platform,
      durationMinutes,
      teamSize,
      phases,
      teamRoles,
      qaChecklist: [
        'Esegui prova generale 48h prima.',
        'Verifica backup connessione (4G/5G hotspot).',
        'Controlla licenze musica/grafica.',
        'Prepara script fallback in caso di interruzioni.',
      ],
      automation: [
        'Usa calendly/event platform per iscrizioni e reminder.',
        'Automatizza promozione countdown su social.',
        'Salva registrazione su cloud e invia highlight automatici.',
      ],
    };
  },
};


