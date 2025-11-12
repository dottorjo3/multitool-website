// Tool: SQL Performance Playbook
// Produces a playbook for tuning SQL queries and warehouses with monitoring actions.

module.exports = {
  async run({ params }) {
    const warehouse = params?.warehouse || 'Snowflake';
    const workloadTypes = Array.isArray(params?.workloadTypes) && params.workloadTypes.length > 0
      ? params.workloadTypes
      : ['dashboarding', 'batch-ETL', 'ad-hoc'];
    const reviewCadence = params?.reviewCadence || 'monthly';

    const playbook = [
      `Catalogare query critiche per workload: ${workloadTypes.join(', ')}.`,
      'Implementare metriche (query time, warehouse credit, cache hit).',
      'Definire processi grooming query (riscrittura, materialized view).',
      `Stabilire review ${reviewCadence} con owner per tuning.`,
      'Automatizzare regression test performance.',
      'Documentare best practice per sviluppatori e analisti.',
    ];

    return {
      summary: `SQL performance playbook per ${warehouse} (review ${reviewCadence}).`,
      warehouse,
      workloadTypes,
      reviewCadence,
      playbook,
      automation: [
        'Alert query lente via warehouse monitoring.',
        'Scheduler per vacuum/analyze o cluster maintenance.',
        'Report cost per workload e suggerimenti scaling.',
      ],
      qaChecklist: [
        'Verificare impatti su SLA dashboard.',
        'Monitorare regressioni dopo modifiche schema.',
        'Aggiornare training team su nuove linee guida.',
      ],
    };
  },
};






