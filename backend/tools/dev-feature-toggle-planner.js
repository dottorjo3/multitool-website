// Tool: Dev Feature Toggle Planner
// Plans feature flag rollout strategy with targeting, lifecycle and tooling.

module.exports = {
  async run({ params }) {
    const flagType = params?.flagType || 'release';
    const targeting = params?.targeting || 'percentage';
    const lifecycle = [
      'Create flag with default off state.',
      'Enable for internal QA/staff.',
      targeting === 'percentage' ? 'Gradually increase rollout % (10/25/50/100).' : 'Target specific segments (team/location).',
      'Monitor metrics (errors, performance, user feedback).',
      'Clean up flag when fully rolled out.',
    ];

    const governance = [
      'Define naming convention (team_scope_feature).',
      'Document owner e obiettivo flag.',
      'Imposta scadenza o reminder cleanup.',
    ];

    return {
      summary: `Feature toggle planner (type ${flagType}, targeting ${targeting}).`,
      flagType,
      targeting,
      lifecycle,
      governance,
      tooling: [
        'LaunchDarkly / Flagsmith / Unleash',
        'Config cat for simple toggle',
        'Integration in CI/CD per environment sync',
      ],
      qaChecklist: [
        'Verifica fallback se flag disattivo.',
        'Testa targeting su ambienti diversi.',
        'Assicura logging e audit delle modifiche.',
      ],
    };
  },
};










