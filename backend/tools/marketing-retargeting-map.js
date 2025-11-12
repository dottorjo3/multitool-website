// Tool: Marketing Retargeting Map
// Builds retargeting audience map with content, cadence and funnel alignment.

module.exports = {
  async run({ params }) {
    const mainGoal = params?.mainGoal || 'conversion';
    const audienceSize = Number(params?.audienceSize) || 5000;
    const platforms = Array.isArray(params?.platforms) && params.platforms.length > 0
      ? params.platforms
      : ['Meta Ads', 'LinkedIn Ads'];

    const funnel = [
      { stage: 'Awareness retarget', windowDays: 7, content: 'Video clip/Use case highlight', cta: 'Visita landing' },
      { stage: 'Consideration retarget', windowDays: 14, content: 'Case study + testimonianze', cta: 'Prenota demo' },
      { stage: 'Decision retarget', windowDays: 30, content: 'Offerta limitata / prova gratuita', cta: 'Conferma acquisto' },
      { stage: 'Retention', windowDays: 60, content: 'Upsell/cross-sell', cta: 'Scopri upgrade' },
    ];

    return {
      summary: `Retargeting map goal ${mainGoal} su ${platforms.join(', ')} (audience ${audienceSize}).`,
      mainGoal,
      audienceSize,
      platforms,
      funnel,
      automation: [
        'Configura segmenti pixel/CRM con finestre temporali dinamiche.',
        'Integra workflow in tool automation (HubSpot, Braze).',
        'Invia alert se audience scende sotto soglia per stage.',
      ],
      qaChecklist: [
        'Verifica esclusioni tra stage per evitare sovrapposizioni.',
        'Controlla frequenza (frequency cap) per ogni piattaforma.',
        'Monitor KPI (CPC, CPM, conversion rate) di ogni livello e ottimizza.',
      ],
    };
  },
};

// Tool: Marketing Retargeting Map
// Creates a retargeting journey plan across channels and funnel stages.

module.exports = {
  async run({ params }) {
    const funnelStages = Array.isArray(params?.funnelStages) && params.funnelStages.length > 0
      ? params.funnelStages
      : ['viewed content', 'added to cart', 'demo requested'];
    const mainChannel = params?.mainChannel || 'paid social';
    const goal = params?.goal || 'conversion';

    const journey = funnelStages.map((stage, index) => ({
      stage,
      order: index + 1,
      channel: mainChannel,
      audienceRule: `Users who ${stage} within last 14 days`,
      creative: 'Carousel, social proof, urgency messaging',
      frequencyCap: '3 impression/day',
      kpi: 'CPL / ROAS',
    }));

    return {
      summary: `Retargeting map per goal ${goal} su canale ${mainChannel}.`,
      funnelStages,
      mainChannel,
      goal,
      journey,
      automation: [
        'Configura segmenti dinamici su Ads Manager / CDP.',
        'Sincronizza audience con CRM per lead scoring.',
        'Programma test creativi A/B su ogni stage.',
      ],
      qaChecklist: [
        'Verifica finestre temporali e esclude audience già convertite.',
        'Assicurati che frequenza non superi soglia fastidio.',
        'Allinea messaging con copy e asset landing page.',
      ],
    };
  },
};


