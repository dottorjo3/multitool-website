// Tool: Marketing Revenue Dashboard Blueprint
// Designs a marketing revenue dashboard with metrics, segmentation and automation.

module.exports = {
  async run({ params }) {
    const metrics = Array.isArray(params?.metrics) && params.metrics.length > 0
      ? params.metrics
      : ['pipeline', 'closed-won', 'CAC', 'LTV'];
    const segments = Array.isArray(params?.segments) && params.segments.length > 0
      ? params.segments
      : ['channel', 'region', 'persona'];
    const refreshInterval = params?.refreshInterval || 'daily';

    const blueprint = [
      'Definisci sorgenti dati (CRM, Marketing Automation, Finance).',
      `Costruisci misure principali: ${metrics.join(', ')}.`,
      `Segmenta per ${segments.join(', ')} con filtri dinamici.`,
      `Aggiorna dashboard ${refreshInterval} con pipeline ETL.`,
      'Integra forecast e target vs actual.',
      'Aggiungi alert per scostamenti significativi.',
    ];

    return {
      summary: `Revenue dashboard con metriche ${metrics.join(', ')} e segmenti ${segments.join(', ')}.`,
      metrics,
      segments,
      refreshInterval,
      blueprint,
      tooling: [
        'Looker, Tableau, PowerBI, Metabase',
        'DBT / Airflow / Fivetran per ETL',
        'CRM (HubSpot, Salesforce) + Data Warehouse',
      ],
      qaChecklist: [
        'Verifica coerenza definizioni metriche tra team.',
        'Controlla lateness dati e fallback manuale in caso di failure.',
        'Documenta dashboard e training per stakeholder.',
      ],
    };
  },
};










