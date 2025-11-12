// Tool: Audio Podcast Showrunner
// Creates a production plan for podcast episodes including roles, timeline and QA.

module.exports = {
  async run({ params }) {
    const episodeLength = Number(params?.episodeLength) || 30;
    const releaseFrequency = params?.releaseFrequency || 'weekly';
    const teamSize = Number(params?.teamSize) || 3;

    const roles = [
      { role: 'Host', tasks: ['Preparare outline', 'Condurre intervista', 'Review finale'] },
      { role: 'Producer', tasks: ['Scheduling ospiti', 'Coordina registrazione', 'QA audio'] },
      { role: 'Editor', tasks: ['Montaggio', 'Mix & master', 'Pubblicazione'] },
    ];

    const timeline = [
      { phase: 'Pre-produzione', tasks: ['Definisci topic', 'Raccogli materiali', 'Brief ospiti'], due: '-7 giorni' },
      { phase: 'Registrazione', tasks: ['Setup microfoni', 'Registrazione episodio', 'Backup file'], due: '-3 giorni' },
      { phase: 'Editing', tasks: ['Taglio filler', 'Aggiungi intro/outro', 'Mastering'], due: '-1 giorno' },
      { phase: 'Publishing', tasks: ['Scrivi descrizione show notes', 'Carica su piattaforma', 'Promozione social'], due: 'giorno 0' },
    ];

    const qaChecklist = [
      'Livello loudness -16 LUFS (stereo).',
      'Assenza di rumori o clipping.',
      'CTA e link menzionati presenti nelle show notes.',
    ];

    return {
      summary: `Showrunner piano podcast ${releaseFrequency}, episodio ${episodeLength} minuti.`,
      episodeLength,
      releaseFrequency,
      teamSize,
      roles,
      timeline,
      qaChecklist,
      automation: [
        'Usa Notion/Trello per tracciare pipeline episodio.',
        'Integra Descript/Podcastle per editing e trascrizione rapida.',
        'Schedula pubblicazione con API piattaforma (Anchor, Libsyn).',
      ],
    };
  },
};

// Tool: Audio Podcast Showrunner
// Outlines a production plan for podcast episodes including roles, timeline and automation.

module.exports = {
  async run({ params }) {
    const format = params?.format || 'interview';
    const episodeLength = Number(params?.episodeLength) || 35;
    const seasonEpisodes = Number(params?.seasonEpisodes) || 8;

    const timeline = [
      'Pre-produzione: ricerca ospiti, definizione outline, script intro/outro.',
      'Registrazione: setup microfono, livelli, backup cloud.',
      'Post-produzione: editing, noise reduction, leveling (-16 LUFS), sound design.',
      'Distribuzione: upload hosting (Anchor, Transistor), scheduling newsletter/social.',
    ];

    const team = [
      { role: 'Host', tasks: ['intervista', 'preparazione scaletta'] },
      { role: 'Producer', tasks: ['booking ospiti', 'gestione timeline', 'dirige registrazione'] },
      { role: 'Editor', tasks: ['editing, mix, master'] },
      { role: 'Marketer', tasks: ['promozione, analytics, community'] },
    ];

    const automation = [
      'Crea template ClickUp/Asana per ogni episodio con checklist.',
      'Utilizza Zapier per pubblicare highlight clips su social.',
      'Genera transcript automatico con Whisper e carica show notes.',
    ];

    return {
      summary: `Showrunner podcast ${format} (${episodeLength} min, ${seasonEpisodes} episodi stagione).`,
      format,
      episodeLength,
      seasonEpisodes,
      timeline,
      team,
      automation,
      qaChecklist: [
        'Controlla livelli audio e rumore di fondo prima di ogni registrazione.',
        'Verifica diritti musica / intro.',
        'Analizza retention episodio e feedback ascoltatori.',
      ],
      assets: [
        'Template show notes',
        'Intro/outro script',
        'Media kit per ospiti',
      ],
    };
  },
};


