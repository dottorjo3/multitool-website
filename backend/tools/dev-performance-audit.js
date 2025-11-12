// Tool: Dev Performance Audit
// Creates a performance audit plan with metrics, tooling and action items.

module.exports = {
  async run({ params }) {
    const stack = params?.stack || 'Node.js';
    const focus = Array.isArray(params?.focus) && params.focus.length > 0
      ? params.focus
      : ['api_latency', 'error_rate', 'db_queries'];
    const frequency = params?.frequency || 'monthly';

    const metrics = [
      'Latency P50/P90/P99',
      'Error rate (5xx, 4xx)',
      'Throughput (req/s)',
      'DB slow queries',
      'External dependency timing',
    ];

    const tooling = [
      'APM (New Relic, Datadog, Elastic APM)',
      'Tracing (OpenTelemetry + Jaeger)',
      'Load testing (k6, Locust)',
    ];

    return {
      summary: `Performance audit ${stack} (${frequency}) con focus ${focus.join(', ')}.`,
      stack,
      focus,
      frequency,
      metrics,
      tooling,
      workflow: [
        'Raccogli metriche baseline e confronta con SLA.',
        'Analizza trace e log per individuare colli di bottiglia.',
        'Prioritizza fix con impatto maggiore (ICE framework).',
        'Documenta miglioramenti e condividi con team.',
      ],
      automation: [
        'Automatizza test di carico su schedule (nightly).',
        'Genera report PDF/Slack con variazioni KPI.',
        'Crea ticket automatici per regressioni sopra soglia.',
      ],
    };
  },
};










