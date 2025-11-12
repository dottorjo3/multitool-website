// Tool: Marketing Influencer Brief
// Generates detailed brief for influencer collaborations with messaging, deliverables and compliance.

module.exports = {
  async run({ params }) {
    const campaignGoal = params?.campaignGoal || 'brand awareness';
    const deliverables = Array.isArray(params?.deliverables) && params.deliverables.length > 0
      ? params.deliverables
      : ['IG Reel', 'Story set', 'LinkedIn post'];
    const compensationModel = params?.compensationModel || 'fixed-fee';

    const briefSections = [
      'Brand overview & value proposition',
      'Audience persona e pain point',
      `Messaging pillars e key CTA per ${campaignGoal}`,
      `Deliverable richiesti: ${deliverables.join(', ')}`,
      `Compensation model: ${compensationModel}, timeline e invio asset`,
      'Compliance: hashtag legali, disclosure, linee guida creative',
      'Metriche da tracciare (reach, engagement, link tracking)',
      'Processo approvazione contenuti e modifiche',
    ];

    return {
      summary: `Influencer brief per goal ${campaignGoal} (deliverable: ${deliverables.join(', ')}).`,
      campaignGoal,
      deliverables,
      compensationModel,
      briefSections,
      automation: [
        'Template Notion/Google Docs per generare brief personalizzati.',
        'Integrazione con piattaforme influencer (Aspire, Upfluence).',
        'Dashboard KPI per monitorare performance e ROI.',
      ],
      qaChecklist: [
        'Verifica che il brief includa messaggi obbligatori e disclaimers.',
        'Allinea tempistiche con calendario marketing e review team legale.',
        'Assicura tracciamento link e codici sconto univoci.',
      ],
    };
  },
};









