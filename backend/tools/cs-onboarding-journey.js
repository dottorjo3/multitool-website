// Tool: Customer Success Onboarding Journey
// Designs a CS onboarding journey with milestones, communications and success metrics.

module.exports = {
  async run({ params }) {
    const planLengthWeeks = Number(params?.planLengthWeeks) || 8;
    const segments = Array.isArray(params?.segments) && params.segments.length > 0
      ? params.segments
      : ['SMB', 'Mid-market', 'Enterprise'];
    const primaryGoal = params?.primaryGoal || 'time-to-value';

    const milestones = [
      { week: 1, focus: 'Kickoff & onboarding call', deliverables: ['Agenda', 'Stakeholder mapping', 'Success plan draft'] },
      { week: 2, focus: 'Technical setup', deliverables: ['Access provisioning', 'Integration checklist', 'Training session'] },
      { week: 4, focus: 'Adoption enablement', deliverables: ['Use case workshop', 'Resource hub', 'Usage dashboard review'] },
      { week: 6, focus: 'Health check', deliverables: ['NPS pulse', 'Risk assessment', 'Action plan'] },
      { week: planLengthWeeks, focus: 'Transition to steady state', deliverables: ['Executive summary', 'QBR scheduling', 'Expansion play'] },
    ];

    return {
      summary: `CS onboarding journey ${planLengthWeeks} settimane, obiettivo ${primaryGoal}.`,
      planLengthWeeks,
      segments,
      primaryGoal,
      milestones,
      communications: [
        'Sequenza email di onboarding e reminder call.',
        'Slack/Teams channel condiviso per supporto veloce.',
        'Report settimanale con stato e prossimo step.',
      ],
      metrics: [
        'Time-to-value (giorni).',
        'Adoption score per funzionalità chiave.',
        'Customer Effort Score post-onboarding.',
      ],
    };
  },
};






