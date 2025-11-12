// Tool: Dev Security Scan Plan
// Generates a plan for application security scanning (SAST, DAST, dependency).

module.exports = {
  async run({ params }) {
    const repositories = Array.isArray(params?.repositories) && params.repositories.length > 0
      ? params.repositories
      : ['backend-api', 'frontend-app', 'infra-terraform'];
    const cadence = params?.cadence || 'weekly';
    const compliance = params?.compliance || ['OWASP Top 10', 'SOC2'];

    const plan = [
      `Catalogo repository target: ${repositories.join(', ')}.`,
      'Configura SAST (es. Semgrep, CodeQL) con policy custom.',
      'Abilita scansione dipendenze (SCA) e alert CVE critici.',
      'Imposta DAST / scanning runtime per endpoint critici.',
      `Programma scansioni ${cadence} e gating su CI.`,
      'Apri ticket automatici con severity e remediation.',
      `Mappa controlli a compliance: ${compliance.join(', ')}.`,
    ];

    return {
      summary: `Security scan plan (${cadence}, compliance ${compliance.join(', ')}).`,
      repositories,
      cadence,
      compliance,
      plan,
      tooling: [
        'GitHub Advanced Security / Snyk / Dependabot',
        'Burp Suite / OWASP ZAP per DAST',
        'Jira automation per remediation',
      ],
      qaChecklist: [
        'Validare risultati con manual review per falsi positivi.',
        'Aggiornare policy dopo release major.',
        'Monitorare tempo medio remediation e compliance audit.',
      ],
    };
  },
};









