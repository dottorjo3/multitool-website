// Tool: Data Dashboard Brief
// Creates a dashboard blueprint with KPIs, audience, layout and governance.

module.exports = {
  async run({ params }) {
    const audience = params?.audience || 'leadership';
    const kpiTargets = Array.isArray(params?.kpiTargets) && params.kpiTargets.length > 0
      ? params.kpiTargets
      : ['MRR', 'Churn %', 'Activation rate'];
    const refresh = params?.refresh || 'daily';

    const sections = [
      { id: 'overview', title: 'Executive Overview', widgets: ['Scorecard KPI principali', 'Trend ultimi 30 giorni'] },
      { id: 'funnel', title: 'Funnel & Conversioni', widgets: ['Grafico funnel', 'Breakdown per segmento'] },
      { id: 'cohort', title: 'Cohort & Retention', widgets: ['Heatmap retention', 'Analisi churn'] },
      { id: 'alerts', title: 'Alert & Insights', widgets: ['Alert configurati', 'Insight automatici'] },
    ];

    return {
      summary: `Dashboard brief per audience ${audience} (refresh ${refresh}).`,
      audience,
      kpiTargets,
      refresh,
      sections,
      governance: [
        'Owner dashboard e processo approvazione modifiche.',
        'Versioning dei filtri critici.',
        'Documentazione definizioni KPI (data dictionary).',
      ],
      automation: [
        'Slack digest giornaliero con variazioni KPI.',
        'Snapshot PDF/Slides automatico per board.',
        'Monitor tempo di caricamento e query cost.',
      ],
    };
  },
};






