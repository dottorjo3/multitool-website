// Tool: Support Feedback Loop
// Establishes loops to capture, prioritize and act on customer feedback from support channels.

module.exports = {
  async run({ params }) {
    const feedbackSources = Array.isArray(params?.feedbackSources) && params.feedbackSources.length > 0
      ? params.feedbackSources
      : ['tickets', 'chats', 'surveys', 'community'];
    const processingCadence = params?.processingCadence || 'biweekly';
    const routingDestinations = Array.isArray(params?.routingDestinations) && params.routingDestinations.length > 0
      ? params.routingDestinations
      : ['product', 'engineering', 'documentation'];

    const loop = {
      intake: [
        `Centralizzare feedback da ${feedbackSources.join(', ')}.`,
        'Classificazione automatica con tag e sentiment.',
        'Link a record CRM e ticket per contesto completo.',
      ],
      prioritization: [
        'Score basato su impatto cliente e frequenza.',
        'Review board cross-funzionale.',
        `Riunioni ${processingCadence} per decisioni e assegnazioni.`,
      ],
      execution: [
        `Routing verso ${routingDestinations.join(', ')} con SLA definiti.`,
        'Tracking stato con board Kanban.',
        'Comunicazioni di follow-up ai clienti.',
      ],
      measurement: [
        'Metriche: tempo di chiusura feedback, percentuale implementazioni.',
        'NPS/CSAT improvement correlato.',
        'Retro trimestrale per ottimizzare processo.',
      ],
    };

    return {
      summary: `Support feedback loop (${processingCadence}, sorgenti ${feedbackSources.length}).`,
      feedbackSources,
      processingCadence,
      routingDestinations,
      loop,
      automation: [
        'Webhook helpdesk → backlog prodotto.',
        'Dashboard sentiment e keywords emergenti.',
        'Notifiche ai clienti quando feedback viene risolto.',
      ],
      qaChecklist: [
        'Assicurare compliance privacy per dati feedback.',
        'Mantenere storico decisioni e motivazioni.',
        'Misurare successo con KPI chiave e share con leadership.',
      ],
    };
  },
};






