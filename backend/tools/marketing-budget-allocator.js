// Tool: Marketing Budget Allocator
// Plans allocation of marketing budget across channels with weighting and KPIs.

module.exports = {
  async run({ params }) {
    const totalBudget = Number(params?.totalBudget) || 50000;
    const channels = Array.isArray(params?.channels) && params.channels.length > 0
      ? params.channels
      : ['paid-social', 'search', 'email', 'events'];
    const weightingFactors = params?.weightingFactors || {
      roi: 0.4,
      audienceFit: 0.3,
      strategicPriority: 0.3,
    };

    const allocationPlan = channels.map((channel) => ({
      channel,
      formula: `budget = totalBudget * (weighted score for ${channel})`,
      metrics: ['CAC', 'ROAS', 'leads', 'pipeline'],
      actions: [
        `Definisci obiettivi specifici per ${channel}.`,
        'Monitora KPI e aggiusta percentualità mensilmente.',
      ],
    }));

    return {
      summary: `Budget allocation plan per ${channels.length} canali su ${totalBudget} €.`,
      totalBudget,
      channels,
      weightingFactors,
      allocationPlan,
      automation: [
        'Dashboard Looker/Metabase con budget vs spend vs ROI.',
        'Script per ricalcolo automatico (es. notebooks o Airflow).',
        'Alert se spend > budget del 10% o ROI < soglia.',
      ],
      qaChecklist: [
        'Allinea le percentuali con obiettivi di business trimestrali.',
        'Considera costi fissi (tooling, creativo) nelle stime.',
        'Rivedi l’allocazione post campagne major o nuovi mercati.',
      ],
    };
  },
};










