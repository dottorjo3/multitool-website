// Tool: AI Style Consistency Checker
// Ensures AI outputs follow brand style guides and terminology.

module.exports = {
  async run({ params }) {
    const referenceDocs = Array.isArray(params?.referenceDocs) && params.referenceDocs.length > 0
      ? params.referenceDocs
      : ['brand-voice', 'glossary', 'writing-guide'];
    const tolerance = Number(params?.tolerance) || 0.15;
    const correctiveMode = params?.correctiveMode || 'rewrite';

    const steps = [
      'Analizza output AI e confronta con esempi approvati.',
      `Misura divergenza stile con embedding similarity (tolleranza ${tolerance}).`,
      'Controlla uso terminologia brand e glossario.',
      `Se deviazione > soglia, applica modalità correttiva ${correctiveMode} (es. rewrite, highlight).`,
      'Genera report con punteggi e suggerimenti.',
    ];

    return {
      summary: `Style consistency con reference ${referenceDocs.join(', ')}, tolleranza ${tolerance}.`,
      referenceDocs,
      tolerance,
      correctiveMode,
      steps,
      automation: [
        'Integra checker in pipeline generazione contenuti.',
        'Salva log e punteggi per modello e prompt.',
        'Allertare copy team se deviazione persistente.',
      ],
      qaChecklist: [
        'Aggiorna reference doc periodicamente.',
        'Verifica risultati con campioni manuali.',
        'Documenta casi limite e regole aggiuntive.',
      ],
    };
  },
};









