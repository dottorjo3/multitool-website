// Tool: Dev Observability Map
// Maps observability stack (logs, metrics, traces, alerts) with ownership and gaps.

module.exports = {
  async run({ params }) {
    const tools = Array.isArray(params?.tools) && params.tools.length > 0
      ? params.tools
      : ['Prometheus', 'Grafana', 'OpenTelemetry', 'Loki'];
    const services = Array.isArray(params?.services) && params.services.length > 0
      ? params.services
      : ['api-gateway', 'billing', 'notifications'];
    const reviewCadence = params?.reviewCadence || 'quarterly';

    const map = services.map((service) => ({
      service,
      metrics: ['latency', 'error_rate', 'throughput'],
      logs: 'Structured JSON + retention policy',
      traces: 'OTel instrumentation coverage',
      alerts: 'SLO/SLA e canali on-call',
      owner: 'Team responsabile servizio',
    }));

    const actions = [
      `Catalogare tool attuali: ${tools.join(', ')}.`,
      'Definire standard naming/label per metriche e log.',
      'Identificare gap (servizi senza tracing o alert).',
      'Implementare SLO con error budget e dashboard.',
      `Rivedere osservabilità ${reviewCadence} e aggiornare playbook.`,
    ];

    return {
      summary: `Observability map per ${services.length} servizi (review ${reviewCadence}).`,
      tools,
      services,
      reviewCadence,
      map,
      actions,
      qaChecklist: [
        'Verificare accessi e permessi ai tool (least privilege).',
        'Eseguire test alert per assicurare delivery.',
        'Aggiornare runbook quando aggiungi nuovi servizi.',
      ],
    };
  },
};









