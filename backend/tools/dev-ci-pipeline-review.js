// Tool: Dev CI Pipeline Review
// Creates a review checklist for CI pipelines covering caching, security and flaky tests.

module.exports = {
  async run({ params }) {
    const ciProvider = params?.ciProvider || 'GitHub Actions';
    const runtimes = Array.isArray(params?.runtimes) && params.runtimes.length > 0
      ? params.runtimes
      : ['Node.js', 'Python'];
    const reviewFrequency = params?.reviewFrequency || 'monthly';

    const checklist = [
      'Verifica struttura workflow e riutilizzo template.',
      `Controlla caching dipendenze per ${runtimes.join(', ')}.`,
      'Analizza step paralleli/runners per ottimizzare tempi.',
      'Rivedi segreti e variabili (rotazione, least privilege).',
      'Monitora flaky test e implementa retry/alert.',
      'Assicura lint/security scan automatici.',
      `Documenta outcome review e azioni da implementare (${reviewFrequency}).`,
    ];

    return {
      summary: `CI pipeline review per ${ciProvider} (${runtimes.join(', ')}, review ${reviewFrequency}).`,
      ciProvider,
      runtimes,
      reviewFrequency,
      checklist,
      tooling: [
        'GitHub Actions Insights / CircleCI Insights',
        'Codecov / SonarQube / Dependabot',
        'Buildkite Test Analytics',
      ],
      automation: [
        'Report automatico via Slack con durata build e failure rate.',
        'Script per detection nuovi flaky test.',
        'Versionamento dei workflow con PR review forzata.',
      ],
    };
  },
};









