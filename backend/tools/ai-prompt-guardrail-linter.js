// Tool: AI Prompt Guardrail Linter
// Lints prompts to ensure compliance with policies, variable usage and format rules.

module.exports = {
  async run({ params }) {
    const policySet = params?.policySet || 'default';
    const maxTokens = Number(params?.maxTokens) || 4000;
    const requiredSections = Array.isArray(params?.requiredSections) && params.requiredSections.length > 0
      ? params.requiredSections
      : ['role', 'instructions', 'outputFormat'];

    const rules = [
      `Assicurati che il prompt non superi ${maxTokens} token.`,
      'Valida presenza delle sezioni richieste e ordine logico.',
      'Verifica utilizzo corretto variabili ({{variable}}) senza placeholder mancanti.',
      'Controlla parole vietate o claim non consentiti dal policy set.',
      'Suggerisci refactoring (bullet, JSON, enumerazioni) per maggiore chiarezza.',
    ];

    return {
      summary: `Guardrail linter policy=${policySet}, tokens<=${maxTokens}.`,
      policySet,
      maxTokens,
      requiredSections,
      rules,
      automation: [
        'Integra il linter in CI per ogni modifica prompt.',
        'Genera report con score e suggerimenti.',
        'Blocca merge se score < soglia o regole critiche fallite.',
      ],
      tooling: [
        'Custom lint CLI (Node/Python) + regole JSON',
        'Spectral / YAML/JSON Schema validator',
        'OpenAI Moderation API / custom classifier per policy',
      ],
    };
  },
};










