// Tool: Customer Success Playbook Builder
// Generates playbooks for CS motions with triggers, actions and assets.

module.exports = {
  async run({ params }) {
    const motionTypes = Array.isArray(params?.motionTypes) && params.motionTypes.length > 0
      ? params.motionTypes
      : ['onboarding', 'adoption', 'renewal', 'expansion'];
    const tooling = Array.isArray(params?.tooling) && params.tooling.length > 0
      ? params.tooling
      : ['Gainsight', 'HubSpot', 'Notion'];
    const reviewCycle = params?.reviewCycle || 'quarterly';

    const playbooks = motionTypes.map((motion) => ({
      motion,
      triggers: ['Usage drop', 'Lifecycle milestone', 'Stakeholder change'],
      actions: ['Email template', 'Executive call', 'Health check survey'],
      assets: ['Deck', 'Checklist', 'FAQ'],
      successMetrics: ['CSAT', 'Retention', 'Expansion'],
    }));

    return {
      summary: `CS playbook builder (${motionTypes.length} motion, review ${reviewCycle}).`,
      motionTypes,
      tooling,
      reviewCycle,
      playbooks,
      automation: [
        `Playbook automation su ${tooling.join(', ')} con task list.`,
        'Alerts automatici basati su segnali prodotto.',
        'Dashboard performance playbook e contenuto aggiornato.',
      ],
      qaChecklist: [
        'Validare playbook con feedback CSM.',
        'Allineare messaging con marketing/prodotto.',
        'Aggiornare asset durante review periodiche.',
      ],
    };
  },
};






