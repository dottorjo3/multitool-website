// Tool: Dev Refactor Roadmap
// Builds a roadmap for refactoring projects based on impact, effort and risk.

module.exports = {
  async run({ params }) {
    const areas = Array.isArray(params?.areas) && params.areas.length > 0
      ? params.areas
      : ['legacy-auth', 'billing-module', 'frontend-state'];
    const prioritizationModel = params?.prioritizationModel || 'ICE';
    const planningHorizon = Number(params?.planningHorizon) || 3;

    const roadmap = areas.map((area) => ({
      area,
      analysis: [
        'Debt description e impatto su utenti/dev velocity',
        'Metriche attuali (bug, MTTR, performance)',
        'Stima effort e dipendenze',
      ],
      prioritization: `Usa modello ${prioritizationModel} per ordinarlo.`,
      milestones: ['Design', 'Implementation', 'Testing', 'Rollout'],
    }));

    return {
      summary: `Refactor roadmap (${areas.length} aree) con modello ${prioritizationModel}.`,
      areas,
      prioritizationModel,
      planningHorizon,
      roadmap,
      automation: [
        'Kanban/backlog dedicato in Jira/Linear.',
        'Dashboard progressivo con burn down debt.',
        'Retro finale per ogni refactor (lessons learned).',
      ],
      qaChecklist: [
        'Coinvolgere stakeholder (product, support) per validare impatti.',
        'Prevedere rollout graduale e feature flags.',
        'Aggiornare documentazione e monitor post refactor.',
      ],
    };
  },
};









