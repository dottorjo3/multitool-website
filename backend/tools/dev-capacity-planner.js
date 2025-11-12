// Tool: Dev Capacity Planner
// Outlines capacity planning for infrastructure (CPU, memory, storage, cost).

module.exports = {
  async run({ params }) {
    const horizonMonths = Number(params?.horizonMonths) || 6;
    const workloads = Array.isArray(params?.workloads) && params.workloads.length > 0
      ? params.workloads
      : ['api', 'batch', 'analytics'];
    const scalingStrategy = params?.scalingStrategy || 'auto-scaling';

    const planner = [
      'Raccogli metriche storiche (cpu, memoria, storage, traffico).',
      `Proietta crescita ${horizonMonths} mesi basata su traffico e nuovi feature.`,
      `Definisci strategia scaling (${scalingStrategy}) e buffer capacità.`,
      'Calcola budget e costi previsti (cloud/on-prem).',
      'Stabilisci piani emergenza (burst traffic, failover).',
      'Review periodica con FinOps e team prodotto.',
    ];

    return {
      summary: `Capacity planner ${horizonMonths} mesi, scaling ${scalingStrategy}.`,
      horizonMonths,
      workloads,
      scalingStrategy,
      planner,
      tooling: [
        'AWS Cost Explorer / GCP Cost Management',
        'Kubernetes metrics + Prometheus',
        'Datadog / Grafana dashboards',
      ],
      qaChecklist: [
        'Convalidare previsioni con metriche reali trimestralmente.',
        'Aggiornare piani in caso di lanci importanti.',
        'Documentare risk/opzioni failover.',
      ],
    };
  },
};









