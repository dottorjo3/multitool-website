// Tool: Customer Success QBR Template
// Generates a Quarterly Business Review template with sections, metrics and calls-to-action.

module.exports = {
  async run({ params }) {
    const focusAreas = Array.isArray(params?.focusAreas) && params.focusAreas.length > 0
      ? params.focusAreas
      : ['business outcomes', 'product roadmap', 'adoption', 'expansion'];
    const presentationFormat = params?.presentationFormat || 'deck';
    const contributors = Array.isArray(params?.contributors) && params.contributors.length > 0
      ? params.contributors
      : ['CSM', 'Product Manager', 'Solutions Engineer'];

    const sections = [
      { id: 'recap', title: 'Highlights & Outcomes', content: ['ROI e KPI principali', 'Success story', 'Quote cliente'] },
      { id: 'adoption', title: 'Adoption & Usage', content: ['Trend utilizzo', 'Health score', 'Roadmap enablement'] },
      { id: 'roadmap', title: 'Product Roadmap & Feedback', content: ['Feature rilasciate', 'Sneak peek', 'Feedback prioritizzato'] },
      { id: 'expansion', title: 'Growth & Expansion', content: ['Opportunità cross/upsell', 'Business case', 'Next steps'] },
      { id: 'actions', title: 'Action Plan', content: ['Owner', 'Deadline', 'Status tracking'] },
    ];

    return {
      summary: `Template QBR (${presentationFormat}, focus ${focusAreas.join(', ')}).`,
      focusAreas,
      presentationFormat,
      contributors,
      sections,
      assets: [
        'Deck PowerPoint/Google Slides.',
        'One-pager esecutivo.',
        'Dashboard live condivisa.',
      ],
      automation: [
        'Pre-popolare metriche dal data warehouse.',
        'Reminder task contributor via project management.',
        'Archiviazione automatica QBR precedenti per confronto.',
      ],
      qaChecklist: [
        'Allineare messaging con leadership interna.',
        'Verificare accuracy dati prima della call.',
        'Documentare esiti e follow-up in CRM.',
      ],
    };
  },
};






