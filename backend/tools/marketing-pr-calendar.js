// Tool: Marketing PR Calendar Planner
// Creates a PR calendar with launch dates, pitches, media list and follow-up.

module.exports = {
  async run({ params }) {
    const horizonMonths = Number(params?.horizonMonths) || 6;
    const launchTypes = Array.isArray(params?.launchTypes) && params.launchTypes.length > 0
      ? params.launchTypes
      : ['product-launch', 'report-release', 'event'];
    const mediaTiers = Array.isArray(params?.mediaTiers) && params.mediaTiers.length > 0
      ? params.mediaTiers
      : ['tier1', 'tier2', 'local'];

    const calendar = launchTypes.map((launch) => ({
      launch,
      pitchPreparation: 'T-8 settimane',
      embargoDate: 'T-1 settimana',
      goLive: 'T',
      followUp: 'T+3 giorni',
      notes: 'Aggiorna media list con contatti e preferenze.',
    }));

    return {
      summary: `PR calendar ${horizonMonths} mesi, launch: ${launchTypes.join(', ')}.`,
      horizonMonths,
      launchTypes,
      mediaTiers,
      calendar,
      automation: [
        'Usa calendario condiviso (Google/Notion) con remind.',
        'CRM PR (Muck Rack, Prowly) per gestire contatti e follow-up.',
        'Report coperture e share of voice mensile.',
      ],
      qaChecklist: [
        'Verifica asset PR (press kit, immagini, quote).',
        'Assicura coerenza messaggi tra team marketing/prodotto.',
        'Documenta risultati e feedback giornalisti.',
      ],
    };
  },
};










