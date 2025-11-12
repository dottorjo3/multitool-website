// Tool: Marketing Lead Nurture Blueprint
// Designs multi-channel lead nurture flows with scoring and automation.

module.exports = {
  async run({ params }) {
    const stages = Array.isArray(params?.stages) && params.stages.length > 0
      ? params.stages
      : ['awareness', 'consideration', 'decision'];
    const channels = Array.isArray(params?.channels) && params.channels.length > 0
      ? params.channels
      : ['email', 'retargeting', 'in-app'];
    const scoringModel = params?.scoringModel || 'BANT';

    const flows = stages.map((stage) => ({
      stage,
      cadence: '1-2 touchpoint/settimana',
      messaging: `Contenuto personalizzato per ${stage}`,
      channels,
      exitCriteria: [`Lead score raggiunge soglia ${scoringModel}`, 'Engagement > soglia', 'Richiesta demo'],
    }));

    return {
      summary: `Lead nurture blueprint (stages ${stages.join(', ')}, scoring ${scoringModel}).`,
      stages,
      channels,
      scoringModel,
      flows,
      automation: [
        'Implementa flussi in marketing automation (HubSpot, Marketo).',
        'Sync lead scoring con CRM per handoff a Sales.',
        'Dashboard conversion funnel per misurare performance.',
      ],
      qaChecklist: [
        'Verifica personalizzazione contenuti per segmenti chiave.',
        'Testa timing email/ads per evitare saturazione.',
        'Assicura compliance (GDPR, CAN-SPAM).',
      ],
    };
  },
};









